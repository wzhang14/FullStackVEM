const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb://wei:TerrySam5@clusterweizhang-shard-00-00-shpxl.mongodb.net:27017,clusterweizhang-shard-00-01-shpxl.mongodb.net:27017,clusterweizhang-shard-00-02-shpxl.mongodb.net:27017/test?ssl=true&replicaSet=ClusterWeiZhang-shard-0&authSource=admin&retryWrites=true', {
        useNewUrlParser: true
    });

    return client.db('VEM').collection('posts');
}

module.exports = router;
