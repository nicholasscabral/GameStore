const Game = require('../models/Game');

class GameController {
  async create(req, res) {
    const { title, price, year, imgUrl } = req.body;

    if (!title || !price || !year || !imgUrl) {
      return res.status(400).send({ error: "fields are missing" });
    }

    const gameAlreadyExists = await Game.findOneByTitle(title)

    if (gameAlreadyExists) {
      return res.status(404).send({ error: "game already registered" });
    }
    
    await Game.new(title, price, year, imgUrl);
    
    res.status(201).json({message: 'game registered', success: true});
  }

  async catalog(req, res) {
    const catalog = await Game.findAll()

    if(catalog.length > 0)
      return res.send(catalog);
    else 
      return res.status(404).send("No game found");
  }

  async search(req, res) {
    const { title } = req.body

    const result = await Game.find(title)

    return res.status(200).send(result)
  }

  async searchById(req, res) {
    const id = req.params.id

    const game = await Game.findById(id)

    return res.send(game)
  }

  async delete(req, res) {
    const id = req.params.id

    await Game.delete(id)

    res.status(200).send({message: 'game deleted', success: true})
  }

  async edit(req, res) {
    const id = req.params.id
    const { title, price, year, imgUrl } = req.body;
    const editField = {
      title,
      price,
      year,
      imgUrl,
    }

    const result = await Game.update(id, editField)
    if(result.success) 
      res.status(200).send({message: 'game updated', success: true})

    else
      res.status(400).send(result.err)
  }
  
}

module.exports = new GameController();