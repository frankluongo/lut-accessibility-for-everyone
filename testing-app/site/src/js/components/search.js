'use strict';

const e = React.createElement;
const useEffect = React.useEffect;
const useState = React.useState;
const useRef = React.useRef
const createRef = React.createRef

const SearchResults = () => {
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		if(typeof window !== 'undefined') {
			const recipeList = window.localStorage.getItem('recipes')
			const query = window.location.search.substring(1)
			const params = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

			if(recipeList && params?.search) {
					const search = params.search.toLowerCase()
					const filteredRecipes = JSON.parse(recipeList).filter(recipe => recipe.title.toLowerCase().includes(search))
					setRecipes(filteredRecipes)
			}
		}
	}, [])

	return (
		<React.Fragment>
			{recipes && recipes.length > 0 ?
				<ul class="recipes">
					{recipes.map(recipe => (
						<li key={recipe.permalink}>
							<RecipeCard {...recipe} />
						</li>
					))}
				</ul>
				: <p>No results found</p>
			}
			
		</React.Fragment>
	)
}

const RecipeCard = ({title, image, permalink}) => (
	<article className="recipe_card">
		<h4>
			<a href={`/${permalink}`}>
				{title}
			</a>
		</h4>
		<img src={image || '/img/placeholder.png'} />
	</article>
)

const SearchQuery = () => {
	const [searchQuery, setSearchQuery] = useState('')
	
	useEffect(() => {
		if(typeof window !== 'undefined') {
			const query = window.location.search.substring(1)
			const params = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

			if(params?.search) {
				setSearchQuery(params.search.replace(/\+/g, ' '))

				document.querySelector('#search input[type="search"]').value = params.search.replace(/\+/g, ' ')
			}
		}
	}, [])


	return (
		<React.Fragment>
			Search Results for: {searchQuery}
		</React.Fragment>
	)
}

ReactDOM.render(<SearchResults />, document.querySelector('#results'));
ReactDOM.render(<SearchQuery />, document.querySelector('#search_query'));