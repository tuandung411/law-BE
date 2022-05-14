const download = async (req, res) => {
    // const data = await download(req.body);
    // res.send(data);
    const { filePath } = req.body;
    console.log(filePath);
    var fullPath = `.\\${filePath}`;
    // const fullPath = `./controllers/1.png`;
    console.log(fullPath);
    res.download(fullPath);
};

module.exports = {
    download,
};
