var selectedFile;
var FileContent;
var input = document.getElementById("gettext");
document.getElementById("savebtn").addEventListener('click', function () {
    SaveText();
    SaveFile(FileContent);
    return;
})

document.getElementById("saveasbtn").addEventListener('click', function () {
    SaveText();
    SaveASFile(FileContent);
    return;
})

document.getElementById("loadfile").addEventListener('click', async () => {
    const file = await openFile();
    const contents = await file.text();
    var fread = new FileReader();
    document.getElementById("gettext").value = contents;
    document.getElementById("filename").innerText = file.name;
})

var inputFile = document.getElementById("loadfile-input");
inputFile.addEventListener('change', async () => {
    console.log(inputFile.files[0]);
    document.getElementById("gettext").value = await inputFile.files[0].text();
    //console.log(handler);
})

const SaveText = function () {
    FileContent = input.value;
}

const SaveFile = async (blob) => {
    try {
        if (selectedFile == undefined) {
            selectedFile = await window.showSaveFilePicker({
                types: [{
                    accept: {
                        // Omitted
                    },
                }],
            });
        }
        console.log(selectedFile);
        const writable = await selectedFile.createWritable();
        await writable.write(blob);
        await writable.close();
        return selectedFile;
    } catch (err) {
        console.error(err.name, err.message);
    }
};

const SaveASFile = async (blob) => {
    try {
        selectedFile = await window.showSaveFilePicker({
            types: [{
                accept: {
                    // Omitted
                },
            }],
        });
        console.log(selectedFile);
        const writable = await selectedFile.createWritable();
        console.log("---------");
        await writable.write(blob);
        await writable.close();
        return selectedFile;
    } catch (err) {
        console.error(err.name, err.message);
    }
}

const openFile = async () => {
    try {
        // Always returns an array.
        const [handle] = await window.showOpenFilePicker();
        selectedFile = await handle;
        console.log(selectedFile);
        return handle.getFile();
    } catch (err) {
        console.error(err.name, err.message);
    }
};

