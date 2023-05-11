import React, {useState} from "react";
import ReactDOM from "react-dom";


//create your first component
const Home = () => {
	const [ inputValue, setInputValue] = useState("");
	const [ todos, setTodos] = useState([]);
	return (
		<>
			<p>to dos</p>
			<div className="container">
				<ul>
					<li>
						<input 
							type="text" 
							onChange={(e) => setInputValue(e.target.value)} 
							value = {inputValue} 
							onKeyPress= {(e) => {
								if (e.key === "Enter"){
									setTodos(todos.concat(inputValue));
									setInputValue("");
								}
							}}
							placeholder="What needs to be done?"/>
					</li>
					
					{todos.map((item, index) =>(
						<li>{item} {" "}
						<span onClick={() => setTodos (todos.filter((item,current) => index != current ))}>x</span>
						</li>
					))}

				</ul>
				<div className="sumTask"> {todos.length} tasks left </div>
			</div>
		</>
	);
};

export default Home;
