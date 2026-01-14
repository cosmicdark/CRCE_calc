
async function getKeys() {
  try {
    const response = await fetch("https://crce-students.contineo.in/parents/");
    const text = await response.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
}

getKeys();
