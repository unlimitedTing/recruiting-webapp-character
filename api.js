export const saveCharacter = async (character) => {
    try {
      const response = await fetch(`https://recruiting.verylongdomaintotestwith.ca/api/{unlimitedTing}/character`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

export const retrieveCharacter = async () => {
try {
    const response = await fetch(`https://recruiting.verylongdomaintotestwith.ca/api/{unlimitedTing}/character`);
    const data = await response.json();
    console.log(data);
    return data;
} catch (error) {
    console.error(error);
}
};