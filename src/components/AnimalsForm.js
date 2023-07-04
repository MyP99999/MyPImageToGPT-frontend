import React, { useState } from 'react';
import axios from 'axios';
import styles from "../index.module.css";
import dog from '../assets/dog.png';

const AnimalsForm = () => {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/api/generate", {
        animal: animalInput
      });



      const data = response.data;
      setResult(data.result);
      console.log(result)
      setAnimalInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <img src={dog} className={styles.icon} alt="dog" />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
};

export default AnimalsForm;
