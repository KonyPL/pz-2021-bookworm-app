import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import background from "./images/viral.jpg";



const startPageHeader = {
	margin: 0,
    padding: 0,
	textAlign: 'center',
	color: 'white',
	backgroundColor: '#b30000',
};

const startPageRole = {
	textAlign: 'center',
	color: 'white',
	backgroundColor: 'red',
}

const buttonChooseStyle = {
    display: 'inline-block',
	position: 'relative',
	marginLeft: '20px',
	cursor: 'pointer',
	width: '608px',
	height: '50px',
	fontSize: '30px',
};

const createButtonStyle = { 
	display: 'inline-block', 
	float: 'right',
	marginTop: '20px',
	marginRight: '20px', 
	width: '120px', 
	height: '40px', 
	cursor: 'pointer', 
	fontSize: '15px'
}

const logoutButtonStyle = { 
	float: 'right',
	marginLeft: '20px', 
	marginTop: '5px',
	width: '120px', 
	height: '40px', 
	cursor: 'pointer', 
	fontSize: '15px'
}

const inputStyle = {
    display: 'inline-block',
	position: 'relative',
	width: '600px',
	height: '50px',
	fontSize: '30px',
};

const deleteAccountButton = {
	width: '120px', 
	height: '40px',
	cursor: 'pointer', 
	fontSize: '15px'
}

var activeForRules;

class Window extends React.Component {
	constructor(props) {
		super(props);

		this.accountTypeClicked = this.accountTypeClicked.bind(this)
		this.chooseLogin = this.chooseLogin.bind(this);
		this.chooseRegister = this.chooseRegister.bind(this);
		this.chooseLogout = this.chooseLogout.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.showDeletePopup = this.showDeletePopup.bind(this);
		this.handleChangeDeletePopup = this.handleChangeDeletePopup.bind(this);
		this.handleSubmitDeletePopup = this.handleSubmitDeletePopup.bind(this);
		this.handleClickDeletePopup = this.handleClickDeletePopup.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.libraryChange = this.libraryChange.bind(this);
		this.userProfileChange = this.userProfileChange.bind(this);

		this.state = { 
			div1Shown: true, 
			userPage: false,
			adminPage: false,
			modePage: false,
			profilPage: false.valueOf,
			
			startText: '',
			username: '', 
			password: '', 
			user_id: '', 

			newBooksChosen: false,
			categoriesChosen: false,
			authorsChosen: false,

			libraryText: 'Library',
			profileText: 'Profile',

			newBooks: [
				{
					title: 'Krzyzacy',
					author: 'Henryk Sienkiewicz',
					yearReleased: 1990,
				},
				{
					title: 'Lalka',
					author: 'Boleslaw Prus',
					yearReleased: 1994,
				},
				{
					title: 'Solaris',
					author: 'Stanislaw Lem',
					yearReleased: 1996,
				},
				{
					title: 'Niezwyciezony',
					author: 'Stanislaw Lem',
					yearReleased: 1997,
				},
			],
			categories: [
				{
					name: 'Romance',
				},
				{
					name: 'Horror',
				},
				{
					name: 'Thriller',
				},
				{
					name: 'Fantasy',
				},
				{
					name: 'Science Fiction'
				},
				{
					name: 'Mystery'
				},
				{
					name: 'Western'
				},
				{
					name: 'Cooking'
				}
			],
			authors: [
				{
					name: 'Stanislaw Lem',
				},
				{
					name: 'Boleslaw Prus',
				},
				{
					name: 'Adam Mickiewicz',
				},
				{
					name: 'Juliusz Slowacki',
				},
				{
					name: 'Henryk Sienkiewicz',
				},
			],

			search: '',
			
			deleteAccountSeen: false,

			deleteAccountModal: true,
			inputValue: '',
			enemyBoardButtons: true,


		};

	}

	togglePop = () => {
		this.setState({
			deleteAccountSeen: !this.state.deleteAccountSeen,
		});
	};

	accountTypeClicked(event){
		console.log("Checkbox clicked")
		var that = this;
		var userAccountCheckbox = document.getElementsByClassName('userAccount')[0];
		var adminAccountCheckbox = document.getElementsByClassName('adminAccount')[0];
		var modeAccountCheckbox = document.getElementsByClassName('modeAccount')[0];
		console.log(event.target.disabled)
		if(event.target.checked == true){
			userAccountCheckbox.disabled = true;
			adminAccountCheckbox.disabled = true;
			modeAccountCheckbox.disabled = true;
			event.target.disabled = false;
		}
		else{
			userAccountCheckbox.disabled = false;
			adminAccountCheckbox.disabled = false;
			modeAccountCheckbox.disabled = false;
		}
		
	}

	chooseLogin(event){
		var that = this;
		console.log("Login nacisniety")

		var userAccountCheckbox = document.getElementsByClassName('userAccount')[0];
		var adminAccountCheckbox = document.getElementsByClassName('adminAccount')[0];
		var modeAccountCheckbox = document.getElementsByClassName('modeAccount')[0];

		if(userAccountCheckbox.checked == false && adminAccountCheckbox.checked == false && modeAccountCheckbox.checked == false){
			that.setState({
				startText: 'Please choose account type',
			});
		}
		else{
			if(userAccountCheckbox.checked){
				that.setState({
					startText: '',
					div1Shown: !that.state.div1Shown,
					userPage: true,
					adminPage: false,
					modePage: false,
				});
				userAccountCheckbox.checked = false;
			}
			else if(adminAccountCheckbox.checked){
				that.setState({
					startText: '',
					div1Shown: !that.state.div1Shown,
					userPage: false,
					adminPage: true,
					modePage: false,
				});
				adminAccountCheckbox.checked = false;
			}
			else{
				that.setState({
					startText: '',
					div1Shown: !that.state.div1Shown,
					userPage: false,
					adminPage: false,
					modePage: true,
				});
				modeAccountCheckbox.checked = false;
			}
		}

	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	chooseRegister(){
		var that = this;

		console.log("Rejestracja nacisnieta")
		// var stat = 0;
		// const requestOptions = {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ "user_name": this.state.username, "pass_hash": this.state.password })
		// };

		// fetch('https://localhost:9000/users/add', requestOptions)
		// .then(function(response) { 
		// 	stat = response.status;
		// 	if(stat == 201){
		// 		that.setState({
		// 			startText: 'New account created.',
		// 		});
		// 	}
		// });
	}

	chooseLogout(){
		var that = this;

		console.log("Wylogowanie nacisniete")
		var userAccountCheckbox = document.getElementsByClassName('userAccount')[0];
		var adminAccountCheckbox = document.getElementsByClassName('adminAccount')[0];
		var modeAccountCheckbox = document.getElementsByClassName('modeAccount')[0];
		that.setState({
			div1Shown: !that.state.div1Shown,
			startText: '',
			username: '', 
			password: '', 
			user_id: '', 
		});

		// var stat = 0;
		// const requestOptions = {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({})
		// };

		// fetch('https://localhost:9000/users/logout', requestOptions)
		// .then(function(response) { 
		// 	stat = response.status;
		// 	if(stat == 200){
		// 		that.setState({
		// 			div1Shown: !that.state.div1Shown,
		// 			startText: '',
		// 			username: '', 
		// 			password: '', 
		// 			user_id: '', 
		// 		});
		// 	}
		// });
	}

	handleSearchChange(e) {
		this.setState({search: e.target.value});
	}

	userProfileChange(){
		var that = this;
		var choice = document.getElementsByClassName('dropdownUser')[0].value;
		that.setState({
			profilPage: true,
		});
		if(choice == 'user-stats'){
			that.setState({
				profileText: 'My statistics',
			});
		}
		else if(choice == 'user-info'){
			that.setState({
				profileText: 'Profile information',
			});
		}
		else if(choice == 'user-books'){
			that.setState({
				profileText: 'My books',
			});
		}
		else if(choice == 'user-reviews'){
			that.setState({
				profileText: 'My reviews',
			});
		}
		else{
			that.setState({
				profileText: 'My list',
			});
		}

	}

	libraryChange(){
		var that = this;
		var choice = document.getElementsByClassName('dropdownLibrary')[0].value;
		// var newBooksDiv = document.getElementsByClassName('newBooks')[0];
		// var categoriesDiv = document.getElementsByClassName('categories')[0];
		// var authorsDiv = document.getElementsByClassName('authors')[0];
		that.setState({
			profilPage: false,
		});
		console.log('Library Change')
		console.log(choice)
		if(choice == 'library-new-books'){
			that.setState({
				newBooksChosen: true,
				categoriesChosen: false,
				authorsChosen: false,
				libraryText: 'New Books',
			});
			// newBooksDiv.style.visibility = 'visible';
			// categoriesDiv.style.visibility = 'hidden';
			// authorsDiv.style.visibility = 'hidden';
		}
		else if(choice == 'library-categories'){
			that.setState({
				newBooksChosen: false,
				categoriesChosen: true,
				authorsChosen: false,
				libraryText: 'Categories',
			});
			// newBooksDiv.style.visibility = 'hidden';
			// categoriesDiv.style.visibility = 'visible';
			// authorsDiv.style.visibility = 'hidden';
		}
		else{
			that.setState({
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: true,
				libraryText: 'Authors',
			});
			// newBooksDiv.style.visibility = 'hidden';
			// categoriesDiv.style.visibility = 'hidden';
			// authorsDiv.style.visibility = 'visible';
		}
	}

	showDeletePopup(){
		console.log("Usuwanie konta")
		document.getElementsByClassName('modalDelete')[0].hidden = false;
	}

	handleClickDeletePopup() {
		document.getElementsByClassName('modalDelete')[0].hidden = true;
	};

	handleSubmitDeletePopup(event) {
		var that = this;
		console.log(this.state.inputValue)
		if(that.state.password = that.state.inputValue){
			var stat = 0;
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ _id: that.state.user_id, pass_hash: that.state.password})
			};

			fetch('https://localhost:9000/users/delete', requestOptions)
			.then(function(response) { 
				stat = response.status;
				console.log(stat)
				if(stat == 200){
					that.setState({
						div1Shown: !that.state.div1Shown,
						startText: '',
						username: '', 
						password: '', 
						user_id: '', 
					});
				}
			})
		}
	}

	handleChangeDeletePopup(event) {
		this.setState({ inputValue: event.target.value });
	}

	render() {
		const newBooksList = this.state.newBooks.map((d) => <li style={{display: 'inline-block'}} key={d.name}><button id='categoryBbutton' class='categoryButton' style={{display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> Title: {d.title} <br></br> Author: {d.author} <br></br> Released: {d.yearReleased} </button></li>);
		const categoriesList = this.state.categories.map((d) => <li style={{display: 'inline-block'}} key={d.name}><button id='categoryBbutton' class='categoryButton' style={{display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> {d.name} </button></li>);
		const authorsList = this.state.authors.map((d) => <li style={{display: 'inline-block'}} key={d.name}><button id='authorsBbutton' class='authorsButton' style={{display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> {d.name} </button></li>);
		
		const noHover = {
			pointerEvents: 'none',
		}

		return (
				this.state.div1Shown ?
				(
					<div id="startPage" style={{ width: '100%', height: '1010px', fontSize: '60px', background: '#b30000', overflowX: 'hidden', }}>
					<h1 style={startPageHeader}>Bookworm Application</h1>
					<p style={{ height: '50px', textAlign: 'center', fontSize: '60px', color: 'white', fontWeight: 'bold' }}>{this.state.startText}</p>
					<div id='login' style={{textAlign: 'center', color: 'white', fontSize: '40px',}}>
						<p>Username</p>
						<input type="text" id="usernameInput" name="usernameInput" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} style={inputStyle}/>
					</div>
					<div id='password' style={{textAlign: 'center', color: 'white', fontSize: '40px',}}>
						<p>Password</p>
						<input type="password" id="passwordInput" name="passwordInput" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} style={inputStyle}/>
					</div>
					<div id="buttons" style={{textAlign: 'center',}}>
						<button style={buttonChooseStyle} class="buttonChoose" id="chooseLogin" onClick={this.chooseLogin}>
							Login
						</button>
						<button style={buttonChooseStyle} class="buttonChoose" id="chooseRegister" onClick={this.chooseRegister}>
							Create new Account
						</button>
					</div>
					<div id="startCheckboxes" style={{textAlign: 'center'}}>
						<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Type of Account</p>
						<label style={{fontSize: '30px', fontWeight: 'bold', marginLeft: '10px', color: 'white' }} class="checkbox-inline">
							<input style={{width: '30px', height: '30px', marginLeft: '10px', display: 'inline-block'}} type="checkbox" ref="userAccount" id="userAccount" onChange={this.accountTypeClicked} class="userAccount"></input>User
						</label>
						<label style={{fontSize: '30px', fontWeight: 'bold', marginLeft: '10px', color: 'white' }} class="checkbox-inline">
							<input style={{width: '30px', height: '30px', marginLeft: '10px', display: 'inline-block'}} type="checkbox" ref="adminAccount" id="adminAccount" onChange={this.accountTypeClicked} class="adminAccount"></input>Administrator
						</label>
						<label style={{fontSize: '30px', fontWeight: 'bold', marginLeft: '10px', color: 'white' }} class="checkbox-inline">
							<input style={{width: '30px', height: '30px', marginLeft: '10px', display: 'inline-block'}} type="checkbox" ref="modeAccount" id="modeAccount" onChange={this.accountTypeClicked} class="modeAccount"></input>Moderator
						</label>
					</div>
					</div>
				)
				:
				(
					this.state.userPage ?
					(
						this.state.profilPage ?
						(
							// backgroundImage: `url(${background})`
							<div id="startPageUser" style={{ width: '100%', height: '1010px', fontSize: '20px', background: '#b30000', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<h3 style={startPageRole}>User</h3>
							<div id="pageAfterLogin" class="pageAfterLogin" style={{ backgroundImage: `url(${background})`, display: 'flex', flexDirection: 'row', }}>
								<div class='top' style={{backgroundColor: '#b30000', width: '100%'}}>
									<div class='topDropdown' style={{backgroundColor: '#b30000', width: '100%'}}>
									<select class="dropdownLibrary" id="app-library" onChange={this.libraryChange}>
										<option value="" disabled='true' selected>Library</option>
										<option value="library-new-books">New books</option>
										<option value="library-categories">Categories</option>
										<option value="library-authors">Authors</option>
									</select>
									<select class="dropdownUser" id="user-profile" onChange={this.userProfileChange}>
										<option value="" disabled='true' selected>My profile</option>
										<option value="user-stats">My statistics</option>
										<option value="user-info">Profile info</option>
										<option value="user-books">My books</option>
										<option value="user-reviews">My reviews</option>
										<option value="user-list">My list</option>
									</select>
									</div>
									<div id="search-box">
										<input id="search-input" type="text" placeholder="Search" onChange={this.handleSearchChange}/>
									</div>
								</div>
						

								<div className="modalDelete" hidden='true'>
									<div className="modal_content">
									<span className="close" onClick={this.handleClickDeletePopup}>
										&times;
									</span>
										<h2 style={{textAlign: 'center'}}>Type in your password to delete Account.</h2>
										<div style={{ textAlign: 'center'}}>
											<label>
											Password:
											<input type="text" name="name" onChange={this.handleChangeDeletePopup} placeholder='Password' style={{ marginLeft: '20px', height: '30px', width: '300px'}}/>
											</label>
										</div>
										<br />
										<div style={{ textAlign: 'center'}}> 
											<button id="submitButton" class="submitButton" onClick={this.handleSubmitDeletePopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
										</div>
									</div>
								</div>

								
							</div>
							<div style={{ display: 'block', backgroundColor: '#b30000' }}>
								
								<div class='toView'>
									<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '60px'}}>{[this.state.profileText]}</p>
									
								</div>

								{/* <div class='newBooks'>
									<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>New Books</p>

								</div>

								<div class='categories'>
									<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Categories</p>

								</div>

								<div class='authors'>
									<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Authors</p>

								</div> */}
							</div>
						</div>
						)
						:
						(
							// backgroundImage: `url(${background})`
							<div id="startPageUser" style={{ width: '100%', height: '1010px', fontSize: '20px', background: '#b30000', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<h3 style={startPageRole}>User</h3>
							<div id="pageAfterLogin" class="pageAfterLogin" style={{ backgroundImage: `url(${background})`, display: 'flex', flexDirection: 'row', }}>
								<div class='top' style={{backgroundColor: '#b30000', width: '100%'}}>
									<div class='topDropdown' style={{backgroundColor: '#b30000', width: '100%'}}>
									<select class="dropdownLibrary" id="app-library" onChange={this.libraryChange}>
										<option value="" disabled='true' selected>Library</option>
										<option value="library-new-books">New books</option>
										<option value="library-categories">Categories</option>
										<option value="library-authors">Authors</option>
									</select>
									<select class="dropdownUser" id="user-profile" onChange={this.userProfileChange}>
										<option value="" disabled='true' selected>My profile</option>
										<option value="user-stats">My statistics</option>
										<option value="user-info">Profile info</option>
										<option value="user-books">My books</option>
										<option value="user-reviews">My reviews</option>
										<option value="user-list">My list</option>
									</select>
									</div>
									<div id="search-box">
										<input id="search-input" type="text" placeholder="Search" onChange={this.handleSearchChange}/>
									</div>
								</div>
								
							</div>
							<div style={{ display: 'block', backgroundColor: '#b30000' }}>
								
								<div class='toView'>
									<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '60px'}}>{[this.state.libraryText]}</p>
									<div style={{display: 'inline-block'}}>
										<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>New Books</p>
										<div class='newBooksListView' style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px'}}>
											{newBooksList}
										</div>
										<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Categories</p>
										<div class='categoriesListView' style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px'}}>
											{categoriesList}
										</div>
										<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Authors</p>
										<div class='authorsListView' style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px'}}>
											{authorsList}
										</div>
									</div>
								</div>
							</div>
						</div>
						)
					)
					:
					(
						this.state.adminPage ?
						(
							// backgroundImage: `url(${background})`
							<div id="startPageAdmin" style={{ width: '100%', height: '1010px', fontSize: '20px', background: 'grey', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<h3 style={startPageHeader}>Administrator</h3>
							<div id="pageAfterLogin" class="pageAfterLogin" style={{ backgroundImage: `url(${background})`, display: 'flex', flexDirection: 'row', }}>
								

								<div className="modalDelete" hidden='true'>
									<div className="modal_content">
									<span className="close" onClick={this.handleClickDeletePopup}>
										&times;
									</span>
										<h2 style={{textAlign: 'center'}}>Type in your password to delete Account.</h2>
										<div style={{ textAlign: 'center'}}>
											<label>
											Password:
											<input type="text" name="name" onChange={this.handleChangeDeletePopup} placeholder='Password' style={{ marginLeft: '20px', height: '30px', width: '300px'}}/>
											</label>
										</div>
										<br />
										<div style={{ textAlign: 'center'}}> 
											<button id="submitButton" class="submitButton" onClick={this.handleSubmitDeletePopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
										</div>
									</div>
								</div>

								
							</div>
						</div>	
						)
						:
						(
							// backgroundImage: `url(${background})`
							<div id="startPageMode" style={{ width: '100%', height: '1010px', fontSize: '20px', background: 'grey', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<h3 style={startPageHeader}>Moderator</h3>
							<div id="pageAfterLogin" class="pageAfterLogin" style={{ backgroundImage: `url(${background})`, display: 'flex', flexDirection: 'row', }}>
								

								<div className="modalDelete" hidden='true'>
									<div className="modal_content">
									<span className="close" onClick={this.handleClickDeletePopup}>
										&times;
									</span>
										<h2 style={{textAlign: 'center'}}>Type in your password to delete Account.</h2>
										<div style={{ textAlign: 'center'}}>
											<label>
											Password:
											<input type="text" name="name" onChange={this.handleChangeDeletePopup} placeholder='Password' style={{ marginLeft: '20px', height: '30px', width: '300px'}}/>
											</label>
										</div>
										<br />
										<div style={{ textAlign: 'center'}}> 
											<button id="submitButton" class="submitButton" onClick={this.handleSubmitDeletePopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
										</div>
									</div>
								</div>

								
							</div>
						</div>	
						)
					)
				)
		);
	}
}

ReactDOM.render(<Window />, document.getElementById('root'));