import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import background from "./images/viral.jpg";
import profilePhotoSource from "./images/profile.jpg";
import solaris from "./images/solaris.jpg";



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

			statisticsChosen: false,
			profileInfoChosen: false,
			booksChosen: false,
			reviewsChosen: false,
			listChosen: false,

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

			name: 'Dominik',
			surName: 'Tomkiewicz',
			userName: 'Dodomonitor2',
			profilePhoto: profilePhotoSource,

			read: 1,
			planned: 10,
			ongoing: 1,
			reviews: 0,
			favGenre: 'Science Fiction',
			favAuthor: 'Stanislaw Lem',

			books: [
				{ 
					name: 'Solaris',
					author: 'Stanislaw Lem',
					released: 1996,
				},
			],

			// reviews: [
			// 	{
			// 		book: 'Solaris',
			// 		rating: 5,
			// 		content: 'Solaris was an amazing book! I recommend it to everyone.',
			// 		date: '7th May 2021',
			// 	},
			// ],


			list: [
				{ 
					name: 'Niezwyciezony',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Nieulekly',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Nienazwany',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Nienasycony',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Niedokonany',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Niewiadomy',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Niewidzacy',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Nieprawy',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Nielewy',
					author: 'Stanislaw Lem',
					released: 1994,
				},
				{ 
					name: 'Nieskonczony',
					author: 'Stanislaw Lem',
					released: 1994,
				},
			],

			users: [
				{
					userName: 'Dodomonitor2',
					name: 'Dominik',
					surName: 'Tomkiewicz',
				},
				{
					userName: 'Dodomonitor',
					name: 'Tomek',
					surName: 'Tomczykiewicz',
				},
			],


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
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: false,
				statisticsChosen: true,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,
				profileText: 'My statistics',
			});
		}
		else if(choice == 'user-info'){
			that.setState({
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: true,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,
				profileText: 'Profile information',
			});
		}
		else if(choice == 'user-books'){
			that.setState({
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: true,
				reviewsChosen: false,
				listChosen: false,
				profileText: 'My books',
			});
		}
		else if(choice == 'user-reviews'){
			that.setState({
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: true,
				listChosen: false,
				profileText: 'My reviews',
			});
		}
		else{
			that.setState({
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: true,
				profileText: 'My list',
			});
		}

	}

	libraryChange(){
		var that = this;
		var choice = document.getElementsByClassName('dropdownLibrary')[0].value;
		// console.log(document.getElementsByClassName('newBooksListDiv')[0])
		// var newBooksDiv = document.getElementsByClassName('newBooksListDiv')[0];
		// var categoriesDiv = document.getElementsByClassName('categoriesListDiv')[0];
		// var authorsDiv = document.getElementsByClassName('authorsListDiv')[0];
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
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,
				libraryText: 'New Books',
			});
			// newBooksDiv.hidden = 'false';
			// categoriesDiv.hidden = 'true';
			// authorsDiv.hidden = 'true';
		}
		else if(choice == 'library-categories'){
			that.setState({
				newBooksChosen: false,
				categoriesChosen: true,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,	
				libraryText: 'Categories',
			});
			// newBooksDiv.hidden = 'true';
			// categoriesDiv.hidden = 'false';
			// authorsDiv.hidden = 'true';
		}
		else{
			that.setState({
				newBooksChosen: false,
				categoriesChosen: false,
				authorsChosen: true,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,
				libraryText: 'Authors',
			});
			// newBooksDiv.hidden = 'true';
			// categoriesDiv.hidden = 'true';
			// authorsDiv.hidden = 'false';
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
		const authorsList = this.state.authors.map((d) => <li style={{display: 'inline-block'}} key={d.name}><button id='authorsButton' class='authorsButton' style={{display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> {d.name} </button></li>);
		const booksList = this.state.books.map((d) => <li style={{display: 'inline-block'}} key={d.name}><button id='bookButton' class='bookButton' style={{ display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> Name: {d.name} <br></br> Author: {d.author} <br></br> Released: {d.released} </button></li>);
		// const reviewsList = this.state.reviews.map((d) => <li style={{display: 'inline-block'}} key={d.book}><button id='bookButton' class='bookButton' style={{ display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> {d.book} <br></br> {d.rating} <br></br> {d.content} </button></li>);
		const plannedList = this.state.list.map((d) => <li style={{display: 'inline-block'}} key={d.name}><button id='bookButton' class='bookButton' style={{ display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> Name: {d.name} <br></br> Author: {d.author} <br></br> Released: {d.released} </button></li>);
		const usersList = this.state.users.map((d) => <li style={{display: 'inline-block'}} key={d.userName}><p style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> <br></br><br></br> Username: {d.userName} <br></br><br></br> Name: {d.name} <br></br><br></br> Surname: {d.surName} </p><br></br><br></br><div style={{ textAlign: 'center' }}><button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }}>Reset Password</button><button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }}>Remove User</button></div></li>);
		const booksListAdmin = this.state.list.map((d) => <li style={{display: 'inline-block'}} key={d.t}><p style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> Title: {d.title} <br></br> Author: {d.author} <br></br> Released: {d.yearReleased} </p><br></br><br></br><div style={{ textAlign: 'center' }}><button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }}>Remove Book</button></div></li>);
		
		const noHover = {
			pointerEvents: 'none',
		}

		return (
				this.state.div1Shown ?
				(
					<div id="startPage" style={{ width: '100%', height: '10000px', fontSize: '60px', background: '#b30000', overflowX: 'hidden', }}>
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
							<div id="startPageUser" style={{ width: '100%', height: '10000px', fontSize: '20px', background: '#b30000', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<hr></hr>
							<h3 style={startPageRole}>User - {[this.state.profileText]}</h3>
							<hr></hr>
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
										<input id="search-input" type="text" placeholder="Search" style={{ marginLeft: '350px'}} onChange={this.handleSearchChange}/>
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
							<hr></hr>
							<div style={{ display: 'block', backgroundColor: '#b30000', height: '100%'}}>
								
								<div class='toView'>
									{/* <p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '60px'}}>{[this.state.libraryText]}</p> */}
									<div style={{display: 'inline-block'}}>
										<div class='userStatsDiv' hidden={!this.state.statisticsChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My statistics</p>
											<div class='statsText' style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Books Read: {this.state.read}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Books Planned: {this.state.planned}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Ongoing: {this.state.ongoing}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Reviews: {this.state.reviews}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Favourite Genre: {this.state.favGenre}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Favourite Author: {this.state.favAuthor}</p>
											</div>

										</div>
										<div class='userInformationListDiv' hidden={!this.state.profileInfoChosen} style={{ position: 'absolute', top: '30%', width: '100%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My profile</p>
											<div>
												<div class='photo' style={{ marginLeft: '50px', backgroundImage: `url(${this.state.profilePhoto})`, width: '500px', height: '600px', display: 'inline-block'}}></div>	
												<div class='infoText' style={{display: 'inline-block', marginLeft: '50px', textAlign: 'center'}}>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Name: {this.state.name}</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Surname: {this.state.surName}</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Nick: {this.state.userName}</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Sth else</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Sth else 2</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Sth else 3</p>
												</div>
												
												
											</div>

										</div>
										<div class='userBooksDiv' hidden={!this.state.booksChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My books</p>
											<div class='userBooksList'>
												{booksList}
											</div>

										</div>
										<div class='userReviewsDiv' hidden={!this.state.reviewsChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My reviews</p>
											<div style={{ textAlign: 'center', color: 'white', fontSize: '50px' }}>
												{/* {reviewsList} */}
												<br></br>
												<br></br>
												<br></br>
												You have no reviews yet
												<br></br>
												<br></br>
												<br></br>
											</div>

										</div>
										<div class='userListDiv' hidden={!this.state.listChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My list</p>
											<div>
												{plannedList}
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
						)
						:
						(
							// backgroundImage: `url(${background})`
							<div id="startPageUser" style={{ width: '100%', height: '10000px', fontSize: '20px', background: '#b30000', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<hr></hr>
							<h3 style={startPageRole}>User - {[this.state.libraryText]}</h3>
							<hr></hr>
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
										<input id="search-input" type="text" placeholder="Search" style={{ marginLeft: '350px'}} onChange={this.handleSearchChange}/>
									</div>
								</div>
								
							</div>
							<hr></hr>
							<div style={{ display: 'block', backgroundColor: '#b30000' }}>
								
								<div class='toView'>
									{/* <p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '60px'}}>{[this.state.libraryText]}</p> */}
									<div style={{display: 'inline-block'}}>
										<div class='newBooksListDiv' hidden={!this.state.newBooksChosen} style={{ position: 'absolute', top: '30%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>New books</p>
											<div class='newBooksListView' style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px'}}>
												{newBooksList}
											</div>
										</div>
										<div class='categoriesListDiv' hidden={!this.state.categoriesChosen} style={{ position: 'absolute', top: '30%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Categories</p>
											<div class='categoriesListView' style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px'}}>
												{categoriesList}
											</div>
										</div>
										<div class='authorsListDiv' hidden={!this.state.authorsChosen} style={{ position: 'absolute', top: '30%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Authors</p>
											<div class='authorsListView' style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px'}}>
												{authorsList}
											</div>
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
							<div id="startPageAdmin" style={{ width: '100%', height: '10000px', fontSize: '20px', backgroundColor: 'grey', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', width: '100%' }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<h3 style={startPageHeader}>Administrator</h3>
							{/* backgroundImage: `url(${background})` */}
							<div id="pageAfterLogin" class="pageAfterLogin" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
								<br></br>
							<div id="search-box" style={{width: '100%'}}>
							<hr></hr>
								<select class="dropdownAdmin" id="user-profile" style={{ display: 'inline-block', width: '100px' }}>
									<option value="" disabled='true' selected>Filter</option>
									<option value="user-list">Categories</option>
									<option value="user-stats">Authors</option>
									<option value="user-info">Date released</option>
									<option value="user-books">Date added</option>
									<option value="user-reviews">Rating</option>
								</select>
								<input style={{display: 'inline-block'}} id="search-input" type="text" placeholder="Search" />
								<button style={{display: 'inline-block'}} id="searchButton" class='searchButton'>Search User</button>
							</div>
								<br></br>								

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
							<hr></hr>
							<div style={{ display: 'inline-block', alignItems: 'center', marginLeft: '450px' }}>
								<button class='adminButtonBook' id="bottom" style={{marginLeft: '20px'}}>Add new book</button>
								<button class='adminButtonBook' id="bottom" style={{marginLeft: '20px'}}>Add new category</button>
								<button class='adminButtonBook' id="bottom" style={{marginLeft: '20px'}}>Add new author</button>
							</div>
							<hr></hr>
							<br></br>
							<div style={{width: '800px', height: '600px', alignContent: 'center'}}>
								{booksListAdmin}
							</div>
							
						</div>	
						)
						:
						(
							// backgroundImage: `url(${background})`
							<div id="startPageMode" style={{ width: '100%', height: '10000px', fontSize: '20px', backgroundColor: 'grey', overflowX: 'hidden', }}>
						<br />
							<div id="startHeader" style={{display: 'flex', flexDirection: 'row', marginLeft: '38%', }}>
								<h1 style={startPageHeader}>&nbsp; &nbsp; Bookworm Application &nbsp; &nbsp;</h1>
								<button class='logoutButton' id='logoutButton' onClick={this.chooseLogout} style={logoutButtonStyle}>Logout</button>
							</div>
							<h3 style={startPageHeader}>Moderator</h3>
							{/* backgroundImage: `url(${background})` */}
							<hr></hr>
							<div id="pageAfterLogin" class="pageAfterLogin" style={{ display: 'flex', flexDirection: 'row', }}>

								<div style={{width: '100%', marginLeft: '300px'}}>
									<input style={{display: 'inline-block'}} id="search-input" type="text" placeholder="Search" />
									<button style={{display: 'inline-block'}} id="searchButton" class='searchButton'>Search User</button>
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
							<hr></hr>
							<div style={{width: '800px', height: '600px', alignContent: 'center'}}>
								{usersList}
							</div>
						</div>	
						)
					)
				)
		);
	}
}

ReactDOM.render(<Window />, document.getElementById('root'));