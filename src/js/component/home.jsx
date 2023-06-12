import React, {useEffect, useState} from "react";

const URLBASE = "http://assets.breatheco.de/apis/fake/todos/user"
const USERBASE = "paolita"

const Home = () => {
	const [ inputValue, setInputValue] = useState("");
	const [ todos, setTodos] = useState([]);

	const getTask = async() => {
		try {
			let response = await fetch (`${URLBASE}/${USERBASE}`)
			let data = await response.json()

            if (response.status == 404) {
                console.log("Debes crear el usuario")
                createUser()
            } else {
                setTodos(data)
            }
		} catch(error){
			console.log(error)
		}
	}
	
	const createUser = async () => {
        try {
            let response = await fetch(`${URLBASE}`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify([])
            })
            if (response.ok) {
                getTask()
            } else {
                console.log(response)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addNewTask = async (event) => {
        console.log(event.key)

        if (event.key == "Enter") {
            try {
                let response = await fetch(`${URLBASE}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify([...tasks, inputValue])
                })
                if (response.ok) {
                    getTask()
                    setInputValue({ label: "", done: false })
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

	useEffect(() => {
		getTask()
	}, [])

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
						<li key={index}>{item.label} {" "}
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
