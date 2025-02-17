const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: "", 
});

const openai = new OpenAIApi(configuration);

app.post('/api/events', (req, res) => {
  const recordedEvents = req.body;

  const generatedCode = recordedEvents.map(event => {
    if (event.type === 'click') {
      return `await page.click('${event.tagName.toLowerCase()}#${event.id}')`;
    } else if (event.type === 'input') {
      return `await page.fill('${event.tagName.toLowerCase()}#${event.id}', '${event.value}')`;
    }
    return '';
  }).join('\n');

  res.json({ generatedCode });
});



app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
