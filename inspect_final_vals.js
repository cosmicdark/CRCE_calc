const axios = require('axios');
const cheerio = require('cheerio');
async function run() {
    try {
        const r = await axios.get('https://crce-students.contineo.in/parents/');
        const $ = cheerio.load(r.data);
        const getVals = (id) => {
            return $(`#${id} option`).map((_, el) => `[${$(el).val()}]`).get();
        };
        console.log("DD:", getVals('dd').slice(0, 15));
        console.log("MM:", getVals('mm'));
        console.log("YYYY:", getVals('yyyy').slice(0, 10));
    } catch (e) {
        console.error(e.message);
    }
}
run();
