import './App.css';
import React, { useState } from 'react';

function App() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddIngredient = () => {
    // Prevent adding empty or blank ingredients
    if (typedText.trim() !== '') {
      setIngredientsList([...ingredientsList, typedText.trim()]);
      setTypedText('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredientsList(ingredientsList.filter(item => item !== ingredientToRemove));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleFindRecipes = async () => {
    setIsLoading(true);
    try {
      const ingredientsString = ingredientsList.join(',');
      const apiKey = 'YOUR_API_KEY_HERE';
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&apiKey=${apiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        setRecipesList(data);
      } else {
        setRecipesList([]);
      }
    } catch (error) {
      setRecipesList([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="pantry-container">
        <img src="/Paltry.png" alt="Paltry Logo" className="app-logo" />
        <div className="input-area">
          <input 
            placeholder="Enter an ingredient"
            value={typedText} 
            onChange={(event) => setTypedText(event.target.value)}
            onKeyDown={handleKeyDown} // Add the key down listener
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        
        <ul className="ingredient-list">
          {ingredientsList.map(ingredient => (
            <li key={ingredient} className="ingredient-item">
              <span>{ingredient}</span>
              <button className="remove-btn" onClick={() => handleRemoveIngredient(ingredient)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <button className="find-recipes-btn" onClick={handleFindRecipes}>Find Recipes</button>
        <div className="recipe-grid">
          {isLoading 
            ? <p className="status-message">Loading...</p> 
            : recipesList.length > 0 
              ? recipesList.map(recipe => (
                  <div key={recipe.id} className="recipe-card">
                    <img src={recipe.image} alt={recipe.title} />
                    <h3>{recipe.title}</h3>
                  </div>
                ))
              : <p className="status-message">No recipes found. Try adding more ingredients!</p>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
