'use strict';

const e = React.createElement;
const useEffect = React.useEffect;
const useState = React.useState;
const useRef = React.useRef;
const createRef = React.createRef;

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      d="M344 360H200c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8h144c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8zm-232 56h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm0-256h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm88-8h144c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8zM416 0H32C14.3 0 0 14.3 0 32v448c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32zm-16 464H48V48h352v416zM134.6 286.4c2.1 2.1 5.5 2.1 7.6 0l64.2-63.6c2.1-2.1 2.1-5.5 0-7.6l-12.6-12.7c-2.1-2.1-5.5-2.1-7.6 0l-47.6 47.2-20.6-20.9c-2.1-2.1-5.5-2.1-7.6 0l-12.7 12.6c-2.1 2.1-2.1 5.5 0 7.6l36.9 37.4zM344 232H237.4c-1.9 5-4.6 9.7-8.5 13.5L194.2 280H344c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8z"
      fill="currentColor"
    />
  </svg>
);
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g stroke-linecap="square" fill="none" stroke="currentColor">
      <path d="M17.293 3.293 21 7v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.586a1 1 0 0 1 .707.293z" />
      <path d="M7 13h10v8H7zM8 3h8v5H8z" />
    </g>
  </svg>
);

const RecipePicker = ({ day, section }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [modalOpen, toggleModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const modalData = {
    recipes,
    allRecipes,
    toggleModal,
    setRecipes,
    day: day.toLowerCase(),
    section: section.toLowerCase(),
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recipeList = window.localStorage.getItem('recipes');
      const savedRecipes = window.localStorage.getItem('savedRecipes');

      if (recipeList) {
        setAllRecipes(JSON.parse(recipeList));
      }

      if (savedRecipes) {
        const data =
          JSON.parse(savedRecipes)[day.toLowerCase()]?.[
            section.toLowerCase()
          ] || [];
        setRecipes(data);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <button onClick={() => toggleModal(true)}>
        <EditIcon />
      </button>
      <ul className="recipes_list">
        {recipes.map((recipe) => (
          <li key={recipe.permalink}>
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
      {modalOpen && (
        <Modal {...modalData}>
          <h4>
            Select Recipes for {day} - {section}
          </h4>
        </Modal>
      )}
    </React.Fragment>
  );
};

const Modal = ({
  allRecipes,
  toggleModal,
  setRecipes,
  recipes,
  day,
  section,
  children,
}) => {
  const select = createRef();
  const selectedRecipes = recipes.map((recipe) => recipe.permalink);
  const saveRecipes = () => {
    const data = window.localStorage.getItem('savedRecipes')
      ? JSON.parse(window.localStorage.getItem('savedRecipes'))
      : {};
    const recipeList = [];
    const options = select.current.selectedOptions;

    for (let opt of options) {
      recipeList.push(JSON.parse(opt.value));
    }

    const newData = {
      ...data,
      [day]: {
        ...data?.[day],
        [section]: recipeList,
      },
    };

    window.localStorage.setItem('savedRecipes', JSON.stringify(newData));

    setRecipes(recipeList);

    toggleModal(false);
  };

  return (
    <ReactModal
      isOpen={true}
      overlayClassName="modal_overlay"
      className="modal_content"
    >
      {children}

      <select ref={select} multiple={true} name="recipes" size="10">
        {allRecipes.map((recipe) => (
          <option
            key={recipe.permalink}
            value={JSON.stringify(recipe)}
            selected={selectedRecipes.includes(recipe.permalink)}
          >
            {recipe.title}
          </option>
        ))}
      </select>
      <button onClick={saveRecipes}>
        <SaveIcon />
      </button>
    </ReactModal>
  );
};

const RecipeCard = ({ title, image, categories, permalink }) => (
  <article className="recipe_card">
    <h4>
      <a href={`/${permalink}`}>{title}</a>
    </h4>
    {image && <img src={image} />}
    <ul className="tags" lang="en-AU">
      {categories.map((cat) => (
        <li key={cat}>{cat}</li>
      ))}
    </ul>
  </article>
);

document.querySelectorAll('.days .day').forEach((day) => {
  const dayName = day.dataset.day;

  day.querySelectorAll('.sections .section').forEach((section) => {
    const sectionName = section.dataset.section;

    const picker = section.querySelector('.picker');

    ReactDOM.render(
      <RecipePicker {...{ day: dayName, section: sectionName }} />,
      picker
    );
  });
});
