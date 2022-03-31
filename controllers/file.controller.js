const download = (req, res) => {
    // const data = await download(req.body);
    // res.send(data);
    const { filePath } = req.body;
    console.log(req);
    const fullPath = `./controllers/1.png`;

    res.download(fullPath);
};

module.exports = {
    download,
};
