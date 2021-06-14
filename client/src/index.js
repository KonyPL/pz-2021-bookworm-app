import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import background from "./images/viral.jpg";
import profilePhotoSource from "./images/noprofile.jpg";
import solaris from "./images/solaris.jpg";
import { isCompositeComponent } from 'react-dom/test-utils';
import 'select-pure';
// import SelectPure from './selectPure';

var activeForUpdate;
var rate = 0;
var toUpdateReview;

const Star = ({ marked, starId }) => {
	return (
	  <span data-star-id={starId} className="star" role="button">
		{marked ? '\u2605' : '\u2606'}
	  </span>
	);
  };
  
const StarRating = ({ value }) => {
	const [rating, setRating] = React.useState(parseInt(value) || 0);
	const [selection, setSelection] = React.useState(0);
  
	const hoverOver = event => {
	  let val = 0;
	  if (event && event.target && event.target.getAttribute('data-star-id'))
		val = event.target.getAttribute('data-star-id');
	  setSelection(val);
	};
	return (
	  <div
		onMouseOut={() => hoverOver(null)}
		onClick={e => { setRating(e.target.getAttribute('data-star-id') || rating); rate = e.target.getAttribute('data-star-id')}}
		onMouseOver={hoverOver}
	  >
		{Array.from({ length: 5 }, (v, i) => (
		  <Star
			starId={i + 1}
			key={`star_${i + 1}`}
			marked={selection ? selection >= i + 1 : rating >= i + 1}
		  />
		))}
	  </div>
	);
};

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

async function getGenre(id){
	var statusGenre;
	var genre;
	var requestOptionsGenre = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	fetch('https://localhost:9000/books/genres/genre?id=' + id, requestOptionsGenre)
	.then(function(genreResponse){
		statusGenre = genreResponse.status;
		var data = genreResponse.json()
		console.log(data)
		return data
	})
	.then(function(genreName){
		genre = genreName;
	})
	return genre;
}

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
		this.clearUsersList = this.clearUsersList.bind(this);
		this.getUsersList = this.getUsersList.bind(this);
		this.removeUser = this.removeUser.bind(this);

		this.handleClickDeleteReset = this.handleClickDeleteReset.bind(this);
		this.resetUserPassword = this.resetUserPassword.bind(this);

		this.promote = this.promote.bind(this);
		this.updateProfile = this.updateProfilePopup.bind(this);
		this.deleteAccount = this.showDeletePopup.bind(this);

		this.handleChangeUpdateNamePopup = this.handleChangeUpdateNamePopup.bind(this);
		this.handleChangeUpdateSurnamePopup = this.handleChangeUpdateSurnamePopup.bind(this);
		this.handleChangeUpdateDateOfBirth = this.handleChangeUpdateDateOfBirth.bind(this);
		this.handleChangeUpdateOldPassword = this.handleChangeUpdateOldPassword.bind(this);
		this.handleChangeUpdateNewPassword = this.handleChangeUpdateNewPassword.bind(this);
		
		this.updateProfilePopup = this.updateProfilePopup.bind(this);
		this.handleClickCloseUpdatePopup = this.handleClickCloseUpdatePopup.bind(this);
		this.handleSubmitUpdatePopup = this.handleSubmitUpdatePopup.bind(this);
		this.handleChangeNewBookName = this.handleChangeNewBookName.bind(this);

		this.handleChangeNewBookAuthor = this.handleChangeNewBookAuthor.bind(this);
		this.handleSubmitNewBook = this.handleSubmitNewBook.bind(this);
		this.handleSubmitNewBookCancel = this.handleSubmitNewBookCancel.bind(this);
		this.addNewBookPressed = this.addNewBookPressed.bind(this);

		this.handleChangeNewGenreName = this.handleChangeNewGenreName.bind(this);
		this.handleChangeNewGenreDescription = this.handleChangeNewGenreDescription.bind(this);
		this.handleSubmitNewGenre = this.handleSubmitNewGenre.bind(this);
		this.handleSubmitNewGenreCancel = this.handleSubmitNewGenreCancel.bind(this);
		this.addNewGenrePressed = this.addNewGenrePressed.bind(this);

		this.getAdminBooksList = this.getAdminBooksList.bind(this);
		this.clearAdminBooksList = this.clearAdminBooksList.bind(this);
		this.updateAdminBooksList = this.updateAdminBooksList.bind(this);
		this.removeBook = this.removeBook.bind(this);
		this.updateBook = this.updateBook.bind(this);

		this.getUserBooksList = this.getUserBooksList.bind(this);
		this.userAddBook = this.userAddBook.bind(this);
		this.userRemoveBook = this.userRemoveBook.bind(this);
		this.userUpdateBook = this.userUpdateBook.bind(this);

		this.filterBooksGenre = this.filterBooksGenre.bind(this);
		this.filterAuthors = this.filterAuthors.bind(this);

		this.handleChangeUpdateBookDate = this.handleChangeUpdateBookDate.bind(this);
		this.handleChangeUpdateBookGenre = this.handleChangeUpdateBookGenre.bind(this);
		this.handleChangeUpdateBookDescription = this.handleChangeUpdateBookDescription.bind(this);
		this.handleSubmitUpdateBook = this.handleSubmitUpdateBook.bind(this);

		this.titleBookClicked = this.titleBookClicked.bind(this);
		this.ongoingBookClicked = this.ongoingBookClicked.bind(this);
		this.finishedBookClicked = this.finishedBookClicked.bind(this);
		this.plannedBookClicked = this.plannedBookClicked.bind(this);

		this.handleClickCloseUpdateUserBookPopup = this.handleClickCloseUpdateUserBookPopup.bind(this);
		this.handleChangeUpdateBookStatus = this.handleChangeUpdateBookStatus.bind(this);
		this.handleChangeUpdateBookProgress = this.handleChangeUpdateBookProgress.bind(this);
		this.handleChangeUpdateBookPassword = this.handleChangeUpdateBookPassword.bind(this);
		this.handleSubmitUpdateBookPopup = this.handleSubmitUpdateBookPopup.bind(this);

		this.userRateBook = this.userRateBook.bind(this);
		this.handleClickCloseRateUserBookPopup = this.handleClickCloseRateUserBookPopup.bind(this);
		this.handleChangeRateBookContent = this.handleChangeRateBookContent.bind(this);
		this.handleChangeRateBookRating = this.handleChangeRateBookRating.bind(this);
		this.handleSubmitRateBookPopup = this.handleSubmitRateBookPopup.bind(this);


		this.userReviewBook = this.userReviewBook.bind(this);

		this.clearUserReviews = this.clearUserReviews.bind(this);
		this.getUserReviews = this.getUserReviews.bind(this);
		

		this.loadMyBooks = this.loadMyBooks.bind(this);

		this.userUpdateReview = this.userUpdateReview.bind(this);
		this.userRemoveReview = this.userRemoveReview.bind(this);
		this.reviewClicked = this.reviewClicked.bind(this);

		this.handleClickCloseUpdateRateUserBookPopup = this.handleClickCloseUpdateRateUserBookPopup.bind(this);

		this.handleClickCloseUserReviewsPopup = this.handleClickCloseUserReviewsPopup.bind(this);
		this.showUserReviews = this.showUserReviews.bind(this);
		this.removeUserReview = this.removeUserReview.bind(this);
		this.userReviewClicked = this.userReviewClicked.bind(this);
		this.clearUserReviewsList = this.clearUserReviewsList.bind(this);

		this.handleSearchChangeAdmin = this.handleSearchChangeAdmin.bind(this);
		this.handleSearchChangeMode = this.handleSearchChangeMode.bind(this);


		this.state = { 
			div1Shown: true, 
			userPage: false,
			adminPage: false,
			modePage: false,
			profilPage: false,
			
			startText: '',
			username: '', 
			password: '', 
			user_id: '', 
			dateOfBirth: '',

			newBooksChosen: false,
			genresChosen: false,
			authorsChosen: false,

			statisticsChosen: false,
			profileInfoChosen: false,
			booksChosen: false,
			reviewsChosen: false,
			listChosen: false,

			libraryText: 'Library',
			profileText: 'Profile',
			
			resetUserLogin: '',
			resetUserPass: '',

			newBooks: [],
			genres: [],
			authors: [],
			adminBooksList: [],
			userBooksList: [],

			search: '',
			
			deleteAccountSeen: false,

			deleteAccountModal: true,
			inputValue: '',
			enemyBoardButtons: true,

			name: 'Dominik',
			surName: 'Tomkiewicz',
			userName: 'Dodomonitor2',
			profilePhoto: profilePhotoSource,
			role: '',

			read: 0,
			planned: 0,
			ongoing: 0,
			reviews: 0,
			favGenre: 'Science Fiction',
			favAuthor: 'Stanislaw Lem',

			inputName: '',
			inputSurname: '',
			inputNewPassword: '',
			inputOldPassword: '',
			inputDateOfBirth: '',

			books: [],
			reviews: 0,
			list: [],
			users: [],
			reviewsList: [],

			newBookName: '',
			newBookAuthor: '',
			modalNewBookStatus: '',

			newGenreName: '',
			newGenreDescription: '',
			modalNewGenreStatus: '',

			updateBookDate: '',
			updateBookId: '',
			updateBookGenre: '',
			updateBookDescription: '',

			listOngoing: [],
			listFinished: [],
			listPlanned: [],

			inputUpdateBookStatus: '',
			inputUpdateBookProgress: 1,
			inputUpdateBookPassword: '',
			bookToUpdateId: 0,

			ratingBookId: 0,
			ratingBookValue: 0,
			ratingBookContent: '',
			rateStatusText: '',

			reviewsEx: [{ review_id: 1, book_name: 'Test'}],

			updateReviewId: 0,

			userReviewsList: [],

		};

		var activeForUpdate = this;
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
		var type = ''

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
					// div1Shown: !that.state.div1Shown,
					userPage: true,
					adminPage: false,
					modePage: false,
				});
				userAccountCheckbox.checked = false;
				type = 'User';
			}
			else if(adminAccountCheckbox.checked){
				that.setState({
					startText: '',
					// div1Shown: !that.state.div1Shown,
					userPage: false,
					adminPage: true,
					modePage: false,
				});
				adminAccountCheckbox.checked = false;
				type = 'Administrator';
			}
			else{
				that.setState({
					startText: '',
					// div1Shown: !that.state.div1Shown,
					userPage: false,
					adminPage: false,
					modePage: true,
				});
				modeAccountCheckbox.checked = false;
				type = 'Moderator';
			}
		}

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "user_login": this.state.username, "user_password": this.state.password })
		};

		var stat = 0;

		that.setState({
			startText: '',
		});

		fetch('https://localhost:9000/users/login', requestOptions)
		.then(function(response) { 
			stat = response.status;
			if(stat != 200){
				that.setState({
					startText: 'Invalid Credentials. Please, try again.',
				});
			}
			return response.json(); 
		}, )
		.then(function(data) { 
			if(stat == 200 && data.user_role == type || data.user_role == 'Administrator'){
				that.setState({
					startText: '',
					div1Shown: !that.state.div1Shown,
					userName: data.user_login,
					password: data.user_password,
					user_id: data._id,
					role: data.user_role,
				});
				that.clearUsersList()
				that.getUsersList()

				var myOptions = [];
				myOptions.push({label: "Wszyscy", value: "Wszyscy"});

				for(var i = 0; i < that.state.users.length; i++){
					myOptions.push({label: that.state.users[i].userName, value: that.state.users[i].userName});
				}

				// new SelectPure(".user-select-pure", {
				// 	options: myOptions,
				// 	multiple: true,
				// 	autocomplete: true,
				// 	icon: "fa fa-times",
				// 	value: ["Wszyscy"],
				// });
			}
			else{
				that.setState({
					startText: 'Specified account is different type',
					userPage: false,
					adminPage: false,
					modePage: false,
				});
				userAccountCheckbox.checked = false;
				adminAccountCheckbox.checked = false;
				modeAccountCheckbox.checked = false;
				type = ''
			}
		})
		.then(function(){
			const requestOptionsGet = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			};
			fetch('https://localhost:9000/users/user?login=' + that.state.userName, requestOptionsGet)
			.then(function(resp){
				stat = resp.status
				return resp.json()
			})
			.then(function(data){
				if(stat == 200){
					try{
						that.setState({
							dateOfBirth: data.birth_date.substring(0, 10),
							name: data.user_name,
							surName: data.user_surname,
							userName: data.user_login,
							favGenre: data.favourite_genre,
							favAuthor: data.favourite_author
						})
					}
					catch(err){

					}
					that.setState({
						read: data.finished_books,
						planned: data.planned_books,
						ongoing: data.ongoing_books,
					})
				}
			})
		})
		.then(function(){
			that.clearAdminBooksList()
			that.getAdminBooksList()
		})
		.then(function(){
			that.clearUserBooksList()
			that.getUserBooksList()
		})
		.then(function(){
			that.clearUserReviews()
			that.getUserReviews()
		})
	}

	clearUserReviews(){
		var that = this;
		that.setState({
			reviewsList: [],
		})
	}

	getUserReviews(){
		var that = this;
		var stat = 0;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('https://localhost:9000/reviews/list?user_login=' + that.state.userName, requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					var book_nam = '';
					var book_aut = '';
					var review = data[i];
					var status;
					var requestOptionsBook = {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					};
					await fetch('https://localhost:9000/books/book?id=' + review.book_id, requestOptionsBook)
					.then(function(answer){
						status = answer.status;
						return answer.json()
					})
					.then(async function(receivedBook){
						if(status == 200){
							var book = receivedBook;
							book_nam = book.book_name;
							book_aut = book.book_author;
							that.setState({
								reviewsList: that.state.reviewsList.concat({review_id: review.review_id, book_id: review.book_id, book_name: book_nam, book_author: book_aut, review_rating: review.review_rating, review_content: review.review_content })
							});
						}
					})
				}
			}
		})
		.then(function(){
			that.setState({
				reviews: that.state.reviewsList.length,
			})
		})
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
		var stat = 0;
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "user_login": this.state.username, "user_password": this.state.password })
		};

		fetch('https://localhost:9000/users/add', requestOptions)
		.then(function(response) { 
			stat = response.status;
			if(stat == 201){
				that.setState({
					startText: 'New account created.',
				});
			}
		});
	}

	chooseLogout(){
		var that = this;

		console.log("Wylogowanie nacisniete")

		var stat = 0;
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		};

		fetch('https://localhost:9000/users/logout', requestOptions)
		.then(function(response) { 
			stat = response.status;
			if(stat == 200){
				that.setState({
					div1Shown: true, 
					userPage: false,
					adminPage: false,
					modePage: false,
					profilPage: false,
					
					startText: '',
					username: '', 
					password: '', 
					user_id: '', 
					dateOfBirth: '',

					newBooksChosen: false,
					genresChosen: false,
					authorsChosen: false,

					statisticsChosen: false,
					profileInfoChosen: false,
					booksChosen: false,
					reviewsChosen: false,
					listChosen: false,

					libraryText: 'Library',
					profileText: 'Profile',
					
					resetUserLogin: '',
					resetUserPass: '',

					newBooks: [],
					genres: [],
					authors: [],
					adminBooksList: [],
					userBooksList: [],

					search: '',
					
					deleteAccountSeen: false,

					deleteAccountModal: true,
					inputValue: '',
					enemyBoardButtons: true,

					name: 'Dominik',
					surName: 'Tomkiewicz',
					userName: 'Dodomonitor2',
					profilePhoto: profilePhotoSource,
					role: '',

					read: 0,
					planned: 0,
					ongoing: 0,
					reviews: 0,
					favGenre: 'Science Fiction',
					favAuthor: 'Stanislaw Lem',

					inputName: '',
					inputSurname: '',
					inputNewPassword: '',
					inputOldPassword: '',
					inputDateOfBirth: '',

					books: [],
					reviews: 0,
					list: [],
					users: [],
					reviewsList: [],

					newBookName: '',
					newBookAuthor: '',
					modalNewBookStatus: '',

					newGenreName: '',
					newGenreDescription: '',
					modalNewGenreStatus: '',

					updateBookDate: '',
					updateBookId: '',
					updateBookGenre: '',
					updateBookDescription: '',

					listOngoing: [],
					listFinished: [],
					listPlanned: [],

					inputUpdateBookStatus: '',
					inputUpdateBookProgress: 1,
					inputUpdateBookPassword: '',
					bookToUpdateId: 0,

					ratingBookId: 0,
					ratingBookValue: 0,
					ratingBookContent: '',
					rateStatusText: '',

					reviewsEx: [{ review_id: 1, book_name: 'Test'}],

					updateReviewId: 0,

					userReviewsList: [],
				});
			}
		});
	}
	// const usersList = this.state.users.map((d) => <li style={{display: 'inline-block'}} key={d.userName}><p style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> <br></br><br></br> Username: {d.userName} <br></br><br></br> Name: {d.name} <br></br><br></br> Surname: {d.surName} </p><br></br><br></br><div style={{ textAlign: 'center' }}><button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }}>Reset Password</button><button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }}>Remove User</button></div></li>);
	getUsersList(){
		var that = this;

		that.clearUsersList();
		var receivedUsers;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		var stat = 0;
		fetch('https://localhost:9000/users/list', requestOptions)
		.then(function(response) { 
			stat = response.status;
			if(stat == 200){
				receivedUsers = response.json();
			}
			return receivedUsers;
		}).then(function(receivedUsers){
			// console.log(receivedUsers)
			for(var i = 0; i < receivedUsers.length; i++){
				var exName = ''
				var exSur = ''
				var role = ''
				var usName = '';
				var requestOptionsUser = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				};
				fetch('https://localhost:9000/users/user?login=' + receivedUsers[i].user_login, requestOptionsUser)
				.then(function(response) { 
					stat = response.status;
					var user_data;
					if(stat == 200){
						user_data = response.json()
					}
					return user_data;
				})
				.then(function(user_data){
					if(stat == 200){
						exName = user_data.user_name;
						exSur = user_data.user_surname;
						role = user_data.user_role;
						usName = user_data.user_login;
						that.setState({
							users: that.state.users.concat({ userName: usName, name: exName, surName: exSur, usRole: role })
						});
					}
				})
			}
		})
	}

	clearUsersList(){

		var that = this;
		that.setState({
			users: [],
		});
	}

	removeUser(username){
		var that = this;

		console.log("Usuwanie usera");

		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"auth_id": that.state.user_id, "auth_password": that.state.password, "user_login": username})
		};
		var stat = 0;
		fetch('https://localhost:9000/users/authority-delete', requestOptions)
		.then(function(response) { 
			stat = response.status;
			console.log(stat)
			if(stat == 200){
			}
		})

		that.clearUsersList()
		that.getUsersList()
	}

	handleClickDeleteReset(){
		document.getElementsByClassName('modalResetPass')[0].hidden = true;
	}

	resetUserPassword(username){
		var that = this;
		document.getElementsByClassName('modalResetPass')[0].hidden = false;

		console.log("Reset hasla usera");

		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"auth_id": that.state.user_id, "auth_password": that.state.password, "user_login": username})
		};
		var stat = 0;
		fetch('https://localhost:9000/users/authority-reset-pass', requestOptions)
		.then(function(response) { 
			stat = response.status;
			console.log(stat)
			if(stat == 200){
				return response.text()
			}
			else{
				return ''
			}
		})
		.then(function(data) { 
			if(stat == 200){
				that.setState({
					resetUserLogin: username,
					resetUserPass: data,
				})
			}
		})
	}

	promote(role, username){
		console.log(role)
		console.log(username)

		var that = this; 

		console.log(that.state.user_id)
		console.log(that.state.password)

		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"promotor_id": that.state.user_id, "promotor_password": that.state.password, "promotee": username, "new_role": role})
		};
		var stat = 0;
		fetch('https://localhost:9000/users/promote', requestOptions)
		.then(function(response) { 
			stat = response.status;
			console.log(stat)
			if(stat == 200){
				that.clearUsersList()
				that.getUsersList()
			}
		})
	}

	updateProfilePopup(){
		var that = this;
		console.log("Aktualizacja konta")
		document.getElementsByClassName('modalUpdate')[0].hidden = false;
		that.setState({
			inputNewPassword: '',
			inputOldPassword: '',
			inputName: '',
			inputSurname: '',
			inputDateOfBirth: ''
		})
	}

	handleClickCloseUpdatePopup() {
		document.getElementsByClassName('modalUpdate')[0].hidden = true;
	};

	handleSubmitUpdatePopup(event) {
		var that = this;
		var stat = 0;
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ _id: that.state.user_id, new_password: that.state.inputNewPassword, user_password: that.state.inputOldPassword, user_name: that.state.inputName, user_surname: that.state.inputSurname, birth_date: that.state.inputDateOfBirth})
		};

		fetch('https://localhost:9000/users/update', requestOptions)
		.then(function(response) { 
			console.log(that.state.user_id)
			console.log(that.state.inputOldPassword)
			stat = response.status;
			console.log(stat)
			if(stat == 200){
				that.setState({
					name: that.state.inputName,
					surName: that.state.inputSurname
				})
				that.handleClickCloseUpdatePopup();
			}
		})
	}

	handleChangeUpdateNamePopup(event) {
		this.setState({ inputName: event.target.value });
	}

	handleChangeUpdateSurnamePopup(event) {
		this.setState({ inputSurname: event.target.value });
	}

	handleChangeUpdateDateOfBirth(event) {
		this.setState({ inputDateOfBirth: event.target.value });
	}

	handleChangeUpdateOldPassword(event) {
		this.setState({ inputOldPassword: event.target.value });
	}

	handleChangeUpdateNewPassword(event) {
		this.setState({ inputNewPassword: event.target.value });
	}

	showDeletePopup(){
		console.log("Usuwanie konta")
		document.getElementsByClassName('modalDelete')[0].hidden = false;
	}

	handleClickCloseDeletePopup() {
		document.getElementsByClassName('modalDelete')[0].hidden = true;
	};

	handleSubmitDeletePopup(event) {
		var that = this;
		console.log(this.state.inputValue)
		if(that.state.password = that.state.inputValue){
			var stat = 0;
			const requestOptions = {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ _id: that.state.user_id, user_password: that.state.password})
			};

			fetch('https://localhost:9000/users/delete', requestOptions)
			.then(function(response) { 
				stat = response.status;
				console.log(stat)
				if(stat == 200){
					that.setState({
						div1Shown: !that.state.div1Shown,
						userName: '',
						password: '',
						user_id: '',
						read: '',
						planned: '',
						ongoing: '',
						name: '',
						surName: '',
						role: '',
						username: '',
						password: ''
					});
				}
			})
		}
	}

	handleChangeDeleteInputPopup(event) {
		this.setState({ inputValue: event.target.value });
	}

	handleSearchChange(e) {
		// this.setState({search: e.target.value});
		var that = this;
		that.setState({search: e.target.value});
		that.clearUserBooksList();
		var filter = document.getElementsByClassName('dropdownUserFilter')[0].value;
		that.clearUserBooksList();
		var stat = 0;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('https://localhost:9000/books/list?' + filter + '=' + that.state.search, requestOptions)
		.then(function(response){
			stat = response.status;
			that.setState({
				newBooks: [],
			})
			return response.json();
		})
		.then(async function(data){
			console.log(data)
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					var book = data[i];
					try{
						date = book.book_released.substring(0, 10)
					}
					catch(error){

					}
					if(date == ''){
						date = 'No date yet'
					}
					if(book.book_genre){
						var date;
						var genre;
						var statusGenre;
						var requestOptionsGenre = {
							method: 'GET',
							headers: { 'Content-Type': 'application/json' },
						};
						await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
						.then(function(genreResponse){
							statusGenre = genreResponse.status;
							return genreResponse.json()
						})
						.then(function(genreName){
							genre = genreName.name
							that.setState({
								newBooks: that.state.newBooks.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: genre, book_description: book.book_description })
							})
						})
					}
					else{
						that.setState({
							newBooks: that.state.newBooks.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: '', book_description: book.book_description })
						})
					}
				}
			}
		})
	}

	handleSearchChangeAdmin(e) {
		// this.setState({search: e.target.value});
		var that = this;
		that.setState({search: e.target.value});
		that.clearUserBooksList();
		var filter = document.getElementsByClassName('dropdownAdmin')[0].value;
		that.clearAdminBooksList();
		var that = this;
		var stat = 0;
		var date;
		var genre;
		var statusGenre;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('https://localhost:9000/books/list?' + filter + '=' + that.state.search, requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json();
		})
		.then(async function(receivedBooks){
			if(stat == 200){
				for(var i = 0; i < receivedBooks.length; i++){
					var book = receivedBooks[i];
					if(book._id){
						var requestOptionsGenre = {
							method: 'GET',
							headers: { 'Content-Type': 'application/json' },
						};
						console.log(book.book_genre)
						await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
						.then(function(genreResponse){
							statusGenre = genreResponse.status;
							return genreResponse.json()
						})
						.then(function(genreReceived){
							if(stat == 200){
								genre = genreReceived;
							}
							return genre;
						})
						.then(function(genre){
							var genreName = genre.name;
							console.log(genreName)
							try{
								date = book.book_released.substring(0, 10)
							}
							catch(error){

							}
							if(date == ''){
								date = 'No date yet';
							}
							that.setState({
								adminBooksList: that.state.adminBooksList.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: genreName, book_description: book.book_description })
							})
						})
					}
					else{
						that.setState({
							adminBooksList: that.state.adminBooksList.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: '', book_description: book.book_description })
						})
					}
				}
			}
		})
	}

	handleSearchChangeMode(e){
		var that = this;
		that.setState({search: e.target.value});
		var filter = document.getElementsByClassName('dropdownMode')[0].value;
		that.clearUsersList();
		var receivedUsers;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		var stat = 0;
		fetch('https://localhost:9000/users/list?' + filter + '=' + that.state.search, requestOptions)
		.then(function(response) { 
			stat = response.status;
			if(stat == 200){
				receivedUsers = response.json();
			}
			return receivedUsers;
		}).then(function(receivedUsers){
			// console.log(receivedUsers)
			for(var i = 0; i < receivedUsers.length; i++){
				var exName = ''
				var exSur = ''
				var role = ''
				var usName = '';
				var requestOptionsUser = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				};
				fetch('https://localhost:9000/users/user?login=' + receivedUsers[i].user_login, requestOptionsUser)
				.then(function(response) { 
					stat = response.status;
					var user_data;
					if(stat == 200){
						user_data = response.json()
					}
					return user_data;
				})
				.then(function(user_data){
					if(stat == 200){
						exName = user_data.user_name;
						exSur = user_data.user_surname;
						role = user_data.user_role;
						usName = user_data.user_login;
						that.setState({
							users: that.state.users.concat({ userName: usName, name: exName, surName: exSur, usRole: role })
						});
					}
				})
			}
		})
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
				genresChosen: false,
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
				genresChosen: false,
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
				genresChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: true,
				reviewsChosen: false,
				listChosen: false,
				profileText: 'My books',
			});
			that.loadMyBooks();
		}
		else if(choice == 'user-reviews'){
			that.setState({
				newBooksChosen: false,
				genresChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: true,
				listChosen: false,
				profileText: 'My reviews',
			});
			that.clearUserReviews();
			that.getUserReviews();
		}
		else{
			that.setState({
				newBooksChosen: false,
				genresChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: true,
				profileText: 'My list',
			});
		}
		document.getElementsByClassName('dropdownLibrary')[0].value = ''
	}

	libraryChange(){
		var that = this;
		var choice = document.getElementsByClassName('dropdownLibrary')[0].value;
		// console.log(document.getElementsByClassName('titlesBooksListDiv')[0])
		// var newBooksDiv = document.getElementsByClassName('titlesBooksListDiv')[0];
		// var genresDiv = document.getElementsByClassName('genresListDiv')[0];
		// var authorsDiv = document.getElementsByClassName('authorsListDiv')[0];
		that.setState({
			profilPage: false,
		});
		console.log('Library Change')
		console.log(choice)
		if(choice == 'library-new-books'){
			that.setState({
				newBooksChosen: true,
				genresChosen: false,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,
				libraryText: 'Titles',
			});

			var stat = 0;
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			};

			fetch('https://localhost:9000/books/list', requestOptions)
			.then(function(response){
				stat = response.status;
				that.setState({
					newBooks: [],
				})
				return response.json();
			})
			.then(async function(data){
				if(stat == 200){
					for(var i = 0; i < data.length; i++){
						var book = data[i];
						try{
							date = book.book_released.substring(0, 10)
						}
						catch(error){

						}
						if(date == ''){
							date = 'No date yet'
						}
						if(book.book_genre){
							var date;
							var genre;
							var statusGenre;
							var requestOptionsGenre = {
								method: 'GET',
								headers: { 'Content-Type': 'application/json' },
							};
							await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
							.then(function(genreResponse){
								statusGenre = genreResponse.status;
								return genreResponse.json()
							})
							.then(function(genreName){
								genre = genreName.name
								that.setState({
									newBooks: that.state.newBooks.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: genre, book_description: book.book_description })
								})
							})
						}
						else{
							that.setState({
								newBooks: that.state.newBooks.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: '', book_description: book.book_description })
							})
						}
					}
				}
			})
			// newBooksDiv.hidden = 'false';
			// genresDiv.hidden = 'true';
			// authorsDiv.hidden = 'true';
		}
		else if(choice == 'library-genres'){
			that.setState({
				newBooksChosen: false,
				genresChosen: true,
				authorsChosen: false,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,	
				libraryText: 'Genres',
			});
			
			var stat = 0;
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			};

			fetch('https://localhost:9000/books/genres/list', requestOptions)
			.then(function(response){
				stat = response.status;
				that.setState({
					genres: [],
				})
				return response.json();
			})
			.then(function(data){
				if(stat == 200){
					for(var i = 0; i < data.length; i++){
						var genre = data[i];
						that.setState({
							genres: that.state.genres.concat({ name: genre.name, description: genre.description })
						})
					}
				}
			})
			// newBooksDiv.hidden = 'true';
			// genresDiv.hidden = 'false';
			// authorsDiv.hidden = 'true';
		}
		else{
			that.setState({
				newBooksChosen: false,
				genresChosen: false,
				authorsChosen: true,
				statisticsChosen: false,
				profileInfoChosen: false,
				booksChosen: false,
				reviewsChosen: false,
				listChosen: false,
				libraryText: 'Authors',
			});

			var stat = 0;
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			};

			fetch('https://localhost:9000/books/list', requestOptions)
			.then(function(response){
				stat = response.status;
				that.setState({
					authors: [],
				})
				return response.json();
			})
			.then(function(data){
				if(stat == 200){
					for(var i = 0; i < data.length; i++){
						var book = data[i];
						var isAuthor = false;
						for(var j = 0; j < that.state.authors.length; j++){
							if(book.book_author == that.state.authors[j].author_name){
								isAuthor = true;
							}
						}
						if(isAuthor == false){
							that.setState({
								authors: that.state.authors.concat({ author_name: book.book_author, })
							})
						}
					}
				}
			})
			// newBooksDiv.hidden = 'true';
			// genresDiv.hidden = 'true';
			// authorsDiv.hidden = 'false';
		}
		document.getElementsByClassName('dropdownUser')[0].value = ''
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

	addNewBookPressed(){
		var mod = document.getElementsByClassName('modalNewBook')[0];
		mod.hidden = false;
	}

	handleChangeNewBookName(event){
		this.setState({ newBookName: event.target.value });
	}

	handleChangeNewBookAuthor(event){
		this.setState({ newBookAuthor: event.target.value });
	}

	// handleChangeNewBookGenre(event){
	// 	this.setState({ newBookName: event.target.value });
	// }

	// handleChangeNewBookDescription(event){
	// 	this.setState({ newBookAuthor: event.target.value });
	// }

	// handleChangeNewBookDate(event){
	// 	this.setState({ newBookName: event.target.value });
	// }

	handleSubmitNewBook(){
		var mod = document.getElementsByClassName('modalNewBook')[0];
		var that = this;
		console.log('Adding New Book')
		var stat = 0;
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			// body: JSON.stringify({ book_id: that.state.newBookId, book_released: that.state.newBookDate, book_genre: that.state.newBookGenre, book_description: that.state.newBookDescription })
			body: JSON.stringify({ book_name: that.state.newBookName, book_author: that.state.newBookAuthor, })
		};

		fetch('https://localhost:9000/books/add', requestOptions)
		.then(function(response) { 
			stat = response.status;
			console.log(stat)
			if(stat == 201){
				that.setState({
					modalNewBookStatus: ""
				})
				mod.hidden = true;
			}
			else{
				that.setState({
					modalNewBookStatus: "Couldn't add specified book"
				})
			}
		})
		that.updateAdminBooksList()
	}

	handleSubmitNewBookCancel(){
		var mod = document.getElementsByClassName('modalNewBook')[0];
		mod.hidden = true;
	}

	addNewGenrePressed(){
		var mod = document.getElementsByClassName('modalNewGenre')[0];
		mod.hidden = false;
	}

	handleChangeNewGenreName(event){
		this.setState({ newGenreName: event.target.value });
	}

	handleChangeNewGenreDescription(event){
		this.setState({ newGenreDescription: event.target.value });
	}

	handleSubmitNewGenre(){
		var mod = document.getElementsByClassName('modalNewGenre')[0];
		var that = this;
		console.log('Adding New Genre')
		var stat = 0;
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: that.state.newGenreName, description: that.state.newGenreDescription})
		};

		fetch('https://localhost:9000/books/genres/add', requestOptions)
		.then(function(response) { 
			stat = response.status;
			console.log(stat)
			if(stat == 201){
				that.setState({
					modalNewGenreStatus: ""
				})
				mod.hidden = true;
			}
			else{
				that.setState({
					modalNewGenreStatus: "Couldn't add specified genre"
				})
			}
		})
	}

	handleSubmitNewGenreCancel(){
		var mod = document.getElementsByClassName('modalNewGenre')[0];
		mod.hidden = true;
	}

	getAdminBooksList(){
		var that = this;
		var stat = 0;
		var date;
		var genre;
		var statusGenre;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('https://localhost:9000/books/list', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json();
		})
		.then(async function(receivedBooks){
			if(stat == 200){
				for(var i = 0; i < receivedBooks.length; i++){
					var book = receivedBooks[i];
					console.log(book)
					if(book._id){
						var requestOptionsGenre = {
							method: 'GET',
							headers: { 'Content-Type': 'application/json' },
						};
						await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
						.then(function(genreResponse){
							statusGenre = genreResponse.status;
							return genreResponse.json()
						})
						.then(function(genreReceived){
							if(stat == 200){
								genre = genreReceived;
							}
							return genre;
						})
						.then(function(genre){
							var genreName = genre.name;
							console.log(genreName)
							try{
								date = book.book_released.substring(0, 10)
							}
							catch(error){

							}
							if(date == ''){
								date = 'No date yet';
							}
							that.setState({
								adminBooksList: that.state.adminBooksList.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: genreName, book_description: book.book_description })
							})
						})
					}
					else{
						that.setState({
							adminBooksList: that.state.adminBooksList.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: '', book_description: book.book_description })
						})
					}
				}
			}
		})
	}

	clearAdminBooksList(){
		var that = this;
		that.setState({
			adminBooksList: [],
		});
	}

	updateAdminBooksList(){
		this.clearAdminBooksList();
		this.getAdminBooksList();
	}

	removeBook(id){
		var that = this;
		var stat = 0;
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book_id: id })
		};
		fetch('https://localhost:9000/books/delete', requestOptions)
		.then(function(response) { 
			stat = response.status;
			if(stat == 200){

			}
		})
		that.updateAdminBooksList();
	}

	updateBook(id, genre){
		var that = this;
		that.setState({
			updateBookId: id,
			updateBookGenre: genre
		})
		var mod = document.getElementsByClassName('modalUpdateBook')[0];
		mod.hidden = false;
	}

	handleChangeUpdateBookDate(event){
		this.setState({ updateBookDate: event.target.value });
	}

	handleChangeUpdateBookGenre(event){
		this.setState({ updateBookGenre: event.target.value });
	}

	handleChangeUpdateBookDescription(event){
		this.setState({ updateBookDescription: event.target.value })
	}

	handleSubmitUpdateBook(){
		var mod = document.getElementsByClassName('modalUpdateBook')[0];
		var that = this;
		var statusGenre;
		var requestOptionsGenre = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('https://localhost:9000/books/genres/list', requestOptionsGenre)
		.then(function(genreResponse){
			statusGenre = genreResponse.status;
			return genreResponse.json()
		})
		.then(async function(genres){
			for(var i = 0; i < genres.length; i++){
				if(genres[i].name == that.state.updateBookGenre){
					var stat = 0;
					const requestOptions = {
						method: 'PATCH',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ book_id: that.state.updateBookId, book_released: that.state.updateBookDate, book_genre: genres[i]._id, book_description: that.state.updateBookDescription })
					};
					await fetch('https://localhost:9000/books/update', requestOptions)
					.then(function(response) { 
						stat = response.status;
						if(stat == 200){
							mod.hidden = true;
						}
					})
				}
			}
		})
	}

	handleSubmitUpdateBookCancel(){
		var mod = document.getElementsByClassName('modalUpdateBook')[0];
		mod.hidden = true;
	}

	getUserBooksList(){
		var that = this;
		var stat = 0;
		var date;
		var book;
		var genre;
		var requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('https://localhost:9000/user-books/list', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(function(data){
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					if(data[i].user_login == that.state.userName){
						var entry = data[i];
						stat = 0;
						requestOptions = {
							method: 'GET',
							headers: { 'Content-Type': 'application/json' },
						};
						fetch('https://localhost:9000/books/book?id=' + data[i].book_id, requestOptions)
						.then(function(response) { 
							stat = response.status;
							return response.json()
						})
						.then(function(bookReceived){
							if(stat == 200){
								book = bookReceived;
							}
							return book;
						})
						.then(async function(book){
							try{
								date = book.book_released.substring(0, 10)
							}
							catch(error){
	
							}
							if(date == ''){
								date = 'No date yet';
							}
							if(book.book_id){
								stat = 0;
								requestOptions = {
									method: 'GET',
									headers: { 'Content-Type': 'application/json' },
								};
								await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptions)
								.then(function(response) { 
									stat = response.status;
									return response.json()
								})
								.then(function(genreReceived){
									if(stat == 200){
										genre = genreReceived;
									}
									return genre;
								})
								.then(function(genre){
									var genreName = genre.name
									that.setState({
										userBooksList: that.state.userBooksList.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genreName, book_progress: entry.book_progress, book_status: entry.book_status, book_id: book._id, book_description: book.book_description })
									})
								})
							}
							else{
								that.setState({
									userBooksList: that.state.userBooksList.concat({book_rating: book.book_rating, book_id: book._id, book_name: book.book_name, book_author: book.book_author, book_released: date, book_genre: '', book_description: book.book_description })
								})
							}
							
						})
					}
				}
			}
		})
	}

	filterBooksGenre(genre){
		var that = this;
		console.log('Filtering with genre: ' + genre)

		that.setState({
			newBooksChosen: true,
			genresChosen: false,
			authorsChosen: false,
			statisticsChosen: false,
			profileInfoChosen: false,
			booksChosen: false,
			reviewsChosen: false,
			listChosen: false,
			libraryText: 'Titles',
			newBooks: [],
		});
		var stat = 0;
		var requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('https://localhost:9000/books/list', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					var book = data[i];
					var date = '';
					try{
						date = book.book_released.substring(0, 10)
					}
					catch(error){
						
					}
					if(date == ''){
						date = 'No date yet';
					}

					var statusGenre
					var requestOptionsGenre = {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					};
					await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
					.then(function(genreResponse){
						statusGenre = genreResponse.status;
						var data = genreResponse.json()
						return data
					})
					.then(function(genre){
						return genre;
					})
					.then(function(genreName){
						if(genreName.name == genre){
							that.setState({
								newBooks: that.state.newBooks.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description })
							})
						}
					})
				}
			}
		})
	}

	filterAuthors(author){
		var that = this;
		console.log('Filtering with author: ' + author)

		that.setState({
			newBooksChosen: true,
			genresChosen: false,
			authorsChosen: false,
			statisticsChosen: false,
			profileInfoChosen: false,
			booksChosen: false,
			reviewsChosen: false,
			listChosen: false,
			libraryText: 'Titles',
			newBooks: [],
		});
		var stat = 0;
		var requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('https://localhost:9000/books/list', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					var book = data[i];
					if(book.book_author == author){
						console.log(book)
						var date = '';
						var genre;
						try{
							date = book.book_released.substring(0, 10)
						}
						catch(error){
							
						}
						if(date == ''){
							date = 'No date yet';
						}
						if(book.book_genre){
							var statusGenre;
							var requestOptionsGenre = {
								method: 'GET',
								headers: { 'Content-Type': 'application/json' },
							};
							await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
							.then(function(genreResponse){
								statusGenre = genreResponse.status;
								return genreResponse.json()
							})
							.then(function(genreName){
								if(statusGenre == 200){
									genre = genreName.name;
									that.setState({
										newBooks: that.state.newBooks.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description })
									})
								}
							})
						}
						else{
							that.setState({
								newBooks: that.state.newBooks.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description })
							})
						}
					}
				}
			}
		})

	}

	clearUserBooksList(){
		var that = this;
		that.setState({
			userBooksList: []
		})
	}

	userAddBook(status, id, name){
		var progress;
		var that = this;
		if(status == 'Read'){
			progress = 100;
		}
		else{
			progress = 0;
		}
		var status;
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book_id: id, user_id: that.state.user_id, user_password: that.state.password, book_status: status, book_progress: progress })
		};
		fetch('https://localhost:9000/user-books/add', requestOptions)
		.then(function(response){
			status = response.status;
			return status;
		})
		.then(function(stat){
			console.log(stat)
			if(stat == 201){
				document.getElementsByClassName(name + '-spec')[0].hidden = !document.getElementsByClassName(name + '-spec')[0].hidden;
				document.getElementsByClassName(name + '-description')[0].hidden = !document.getElementsByClassName(name + '-description')[0].hidden;
				document.getElementsByClassName(name + '-ongoing')[0].hidden = !document.getElementsByClassName(name + '-ongoing')[0].hidden;
				document.getElementsByClassName(name + '-read')[0].hidden = !document.getElementsByClassName(name + '-read')[0].hidden;
				document.getElementsByClassName(name + '-planned')[0].hidden = !document.getElementsByClassName(name + '-planned')[0].hidden;
			}
		})
	}

	userRemoveBook(id){
		var that = this;

		var status;
		var requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_book_id: id, user_id: that.state.user_id, user_password: that.state.password })
		};
		fetch('https://localhost:9000/user-books/delete', requestOptions)
		.then(function(response){
			status = response.status;
			return status;
		})
		.then(function(stat){
			if(stat == 200){
				that.loadMyBooks();
			}
		})
	}

	userUpdateBook(id, progress){
		var that = this;
		that.setState({
			bookToUpdateId: id,
			inputUpdateBookProgress: progress,
		})
		document.getElementsByClassName('modalUpdateUserBook')[0].hidden = false;
	}

	handleClickCloseUpdateUserBookPopup(){
		document.getElementsByClassName('modalUpdateUserBook')[0].hidden = true;
	}

	handleChangeUpdateBookStatus(event){
		this.setState({ inputUpdateBookStatus: event.target.value })
	}

	handleChangeUpdateBookProgress(event){
		this.setState({ inputUpdateBookProgress: event.target.value })
		console.log(this.state.inputUpdateBookProgress)
	}
	
	handleChangeUpdateBookPassword(event){
		this.setState({ inputUpdateBookPassword: event.target.value })
	}
	
	handleSubmitUpdateBookPopup(){
		var that = this;
		console.log('Update book')

		console.log(that.state.bookToUpdateId)
		console.log(that.state.user_id)
		console.log(that.state.password)
		console.log(that.state.inputUpdateBookStatus)
		console.log(that.state.inputUpdateBookProgress)

		var stat = 0;
		var requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_book_id: that.state.bookToUpdateId, user_id: that.state.user_id, user_password: that.state.password, book_status: that.state.inputUpdateBookStatus, book_progress: parseInt(that.state.inputUpdateBookProgress) / 100 })
		};
		fetch('https://localhost:9000/user-books/update', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				document.getElementsByClassName('modalUpdateUserBook')[0].hidden = true;
				that.loadMyBooks();
				that.setState({
					inputUpdateBookProgress: 1,
				})
			}
			else if(stat == 405){
				
			}
		})
	}

	userRateBook(id){
		var that = this;
		that.setState({
			ratingBookId: id,
		})
		document.getElementsByClassName('modalRateUserBook')[0].hidden = false;
	}

	userReviewBook(id){
		
	}

	handleClickCloseRateUserBookPopup(){
		document.getElementsByClassName('modalRateUserBook')[0].hidden = true;
		console.log(rate)
	}

	handleChangeRateBookRating(event){
	}

	handleChangeRateBookContent(event){
		this.setState({ ratingBookContent: event.target.value })
	}
	
	handleSubmitRateBookPopup(){
		var that = this;
		console.log('Rate book')

		console.log(that.state.ratingBookId)
		console.log(that.state.user_id)
		console.log(that.state.password)
		console.log(that.state.ratingBookContent)
		console.log(rate)

		var stat = 0;
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book_id: that.state.ratingBookId, user_id: that.state.user_id, user_password: that.state.password, review_rating: parseInt(rate), review_content: that.state.ratingBookContent })
		};
		fetch('https://localhost:9000/reviews/add', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(function(data){
			if(stat == 201){
				document.getElementsByClassName('modalRateUserBook')[0].hidden = true;
				that.loadMyBooks();
				rate = 0;
			}
			else if(stat == 405){
				that.setState({
					rateStatusText: 'Book already has review.',
				})
			}
		})
	}

	titleBookClicked(name){
		document.getElementsByClassName(name + '-spec')[0].hidden = !document.getElementsByClassName(name + '-spec')[0].hidden;
		document.getElementsByClassName(name + '-description')[0].hidden = !document.getElementsByClassName(name + '-description')[0].hidden;
		document.getElementsByClassName(name + '-ongoing')[0].hidden = !document.getElementsByClassName(name + '-ongoing')[0].hidden;
		document.getElementsByClassName(name + '-read')[0].hidden = !document.getElementsByClassName(name + '-read')[0].hidden;
		document.getElementsByClassName(name + '-planned')[0].hidden = !document.getElementsByClassName(name + '-planned')[0].hidden;
	}

	loadMyBooks(){
		var that = this;
		console.log('Loading user books')

		that.setState({
			listOngoing: [],
			listFinished: [],
			listPlanned: [],
		})
		var stat = 0;
		var requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('https://localhost:9000/user-books/list?user_login=' + that.state.username, requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					var status;
					var current_book_status = data[i].book_status;
					var requestOptionsBook = {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					};
					await fetch('https://localhost:9000/books/book?id=' + data[i].book_id, requestOptionsBook)
					.then(function(response){
						status = response.status;
						return response.json()
					})
					.then(async function(receivedBook){
						if(status == 200){
							var book = receivedBook;
							var date = '';
							var genre;
							try{
								date = book.book_released.substring(0, 10)
							}
							catch(error){
								
							}
							if(date == ''){
								date = 'No date yet';
							}
							if(book.book_genre){
								var statusGenre;
								var requestOptionsGenre = {
									method: 'GET',
									headers: { 'Content-Type': 'application/json' },
								};
								await fetch('https://localhost:9000/books/genres/genre?id=' + book.book_genre, requestOptionsGenre)
								.then(function(genreResponse){
									statusGenre = genreResponse.status;
									return genreResponse.json()
								})
								.then(function(genreName){
									if(statusGenre == 200){
										genre = genreName.name;
										if(current_book_status == 'Ongoing'){
											that.setState({
												listOngoing: that.state.listOngoing.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description, user_book_id: data[i].user_book_id, book_progress: Math.round(data[i].book_progress * 10000) / 100 })
											})
										}
										else if(current_book_status == 'Finished'){
											that.setState({
												listFinished: that.state.listFinished.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description, user_book_id: data[i].user_book_id, book_progress: Math.round(data[i].book_progress * 10000) / 100 })
											})
										}
										else{
											that.setState({
												listPlanned: that.state.listPlanned.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description, user_book_id: data[i].user_book_id, book_progress: Math.round(data[i].book_progress * 10000) / 100 })
											})
										}
									}
								})
							}
							else{
								if(current_book_status == 'Ongoing'){
									that.setState({
										listOngoing: that.state.listOngoing.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description, user_book_id: data[i].user_book_id, book_progress: Math.round(data[i].book_progress * 10000) / 100 })
									})
								}
								else if(current_book_status == 'Finished'){
									that.setState({
										listFinished: that.state.listFinished.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description, user_book_id: data[i].user_book_id, book_progress: Math.round(data[i].book_progress * 10000) / 100 })
									})
								}
								else{
									that.setState({
										listPlanned: that.state.listPlanned.concat({ book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre, book_id: book._id, book_description: book.book_description, user_book_id: data[i].user_book_id, book_progress: Math.round(data[i].book_progress * 10000) / 100 })
									})
								}
							}
						}
					})
				}
			}
		})
	}

	ongoingBookClicked(name){
		console.log('Ongoing')
		document.getElementsByClassName(name + '-spec-ongoing')[0].hidden = !document.getElementsByClassName(name + '-spec-ongoing')[0].hidden;
		document.getElementsByClassName(name + '-update-ongoing')[0].hidden = !document.getElementsByClassName(name + '-update-ongoing')[0].hidden;
		document.getElementsByClassName(name + '-remove-ongoing')[0].hidden = !document.getElementsByClassName(name + '-remove-ongoing')[0].hidden;
	}

	finishedBookClicked(name){
		console.log('Finished')
		document.getElementsByClassName(name + '-spec-finished')[0].hidden = !document.getElementsByClassName(name + '-spec-finished')[0].hidden;
		document.getElementsByClassName(name + '-update-finished')[0].hidden = !document.getElementsByClassName(name + '-update-finished')[0].hidden;
		document.getElementsByClassName(name + '-remove-finished')[0].hidden = !document.getElementsByClassName(name + '-remove-finished')[0].hidden;
		document.getElementsByClassName(name + '-rate-finished')[0].hidden = !document.getElementsByClassName(name + '-rate-finished')[0].hidden;
		// document.getElementsByClassName(name + '-review-finished')[0].hidden = !document.getElementsByClassName(name + '-review-finished')[0].hidden;
	}

	plannedBookClicked(name){
		console.log('Planned')
		document.getElementsByClassName(name + '-spec-planned')[0].hidden = !document.getElementsByClassName(name + '-spec-planned')[0].hidden;
		document.getElementsByClassName(name + '-update-planned')[0].hidden = !document.getElementsByClassName(name + '-update-planned')[0].hidden;
		document.getElementsByClassName(name + '-remove-planned')[0].hidden = !document.getElementsByClassName(name + '-remove-planned')[0].hidden;
	}

	reviewClicked(review_id, book_id){
		document.getElementsByClassName(review_id + '-update-review')[0].hidden = !document.getElementsByClassName(review_id + '-update-review')[0].hidden;
		document.getElementsByClassName(review_id + '-remove-review')[0].hidden = !document.getElementsByClassName(review_id + '-remove-review')[0].hidden;
	}

	userRemoveReview(review_id, book_id){
		var that = this;
		var stat = 0;
		var requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: that.state.user_id, user_password: that.state.password, review_id: review_id })
		};
		fetch('https://localhost:9000/reviews/delete', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				document.getElementsByClassName(review_id + '-update-review')[0].hidden = true;
				document.getElementsByClassName(review_id + '-remove-review')[0].hidden = true;
			}
		})
		.then(function(){
			that.clearUserReviews();
			that.getUserReviews();
		})
	}

	userUpdateReview(review_id, book_id){
		var that = this;
		toUpdateReview = that;
		console.log(that);
		that.setState({
			ratingBookId: book_id,
			updateReviewId: review_id,
		})
		document.getElementsByClassName('modalUpdateRateUserBook')[0].hidden = false;
	}

	handleClickCloseUpdateRateUserBookPopup(){
		document.getElementsByClassName('modalUpdateRateUserBook')[0].hidden = true;
	}

	handleSubmitUpdateRateBookPopup(){
		var that = toUpdateReview;
		console.log('Update rate')

		var stat = 0;
		var requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ review_id: that.state.updateReviewId, user_id: that.state.user_id, user_password: that.state.password, review_rating: parseInt(rate), review_content: that.state.ratingBookContent })
		};
		fetch('https://localhost:9000/reviews/update', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(function(data){
			if(stat == 200){
				document.getElementsByClassName('modalUpdateRateUserBook')[0].hidden = true;
				document.getElementsByClassName(that.state.updateReviewId + '-update-review')[0].hidden = true;
				document.getElementsByClassName(that.state.updateReviewId + '-remove-review')[0].hidden = true;
				rate = 0;
			}
		})
		.then(function(){
			that.clearUserReviews();
			that.getUserReviews();
		})
	}

	handleClickCloseUserReviewsPopup(){
		document.getElementsByClassName('modalUserReviews')[0].hidden = true;
	}

	clearUserReviewsList(){
		var that = this;
		that.setState({
			userReviewsList: [],
		})
	}

	showUserReviews(userName){
		var that = this;
		that.clearUserReviewsList();
		var stat = 0;
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('https://localhost:9000/reviews/list?user_login=' + that.state.userName, requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				for(var i = 0; i < data.length; i++){
					var book_nam = '';
					var book_aut = '';
					var review = data[i];
					var status;
					var requestOptionsBook = {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					};
					await fetch('https://localhost:9000/books/book?id=' + review.book_id, requestOptionsBook)
					.then(function(answer){
						status = answer.status;
						return answer.json()
					})
					.then(async function(receivedBook){
						if(status == 200){
							var book = receivedBook;
							book_nam = book.book_name;
							book_aut = book.book_author;
							that.setState({
								userReviewsList: that.state.userReviewsList.concat({review_id: review.review_id, book_id: review.book_id, book_name: book_nam, book_author: book_aut, review_rating: review.review_rating, review_content: review.review_content })
							});
						}
					})
				}
			}
		})
		.then(function(){
			document.getElementsByClassName('modalUserReviews')[0].hidden = false;
		})
	}

	removeUserReview(review_id, book_id){
		var that = this;
		var stat = 0;
		var requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ auth_id: that.state.user_id, auth_password: that.state.password, review_id: review_id })
		};
		fetch('https://localhost:9000/reviews/authority-delete', requestOptions)
		.then(function(response) { 
			stat = response.status;
			return response.json()
		})
		.then(async function(data){
			if(stat == 200){
				document.getElementsByClassName(review_id + '-remove-review-moderator')[0].hidden = true;
			}
		})
		.then(function(){
			that.clearUserReviewsList();
			that.showUserReviews();
		})
	}

	userReviewClicked(review_id, book_id){
		document.getElementsByClassName(review_id + '-remove-review-moderator')[0].hidden = !document.getElementsByClassName(review_id + '-remove-review-moderator')[0].hidden;
	}

	render() {
		// book_rating: book.book_rating, book_author: book.book_author, book_name: book.book_name, book_released: date, book_genre: genre 
		const titlesBooksList = this.state.newBooks.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top',}} key={d.book_name}><button id='categoryButton' class='categoryButton' style={{display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.titleBookClicked(d.book_name)}> 
			<p class={d.book_name + '-spec'}> <br></br> Title: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Released: {d.book_released} <br></br><br></br> Rating: <StarRating value={d.book_rating}/> <br></br> Genre: {d.book_genre} <br></br> </p> <p style={{ fontSize: '20px'}} class={d.book_name + '-description'} hidden='true'> Description: {d.book_description} </p> 
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-ongoing'} hidden='true' onClick={() => this.userAddBook('Ongoing', d.book_id, d.book_name)}>Add book to ongoing</button>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-read'} hidden='true' onClick={() => this.userAddBook('Finished', d.book_id, d.book_name)}>Add book to finished</button>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-planned'} hidden='true' onClick={() => this.userAddBook('Planned', d.book_id, d.book_name)}>Add book to planned</button>
		</button></li>);

		const genresList = this.state.genres.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top', }} key={d.name}><button id='categoryButton' class='categoryButton' style={{display: 'inline-block', width: '400px', height: '200px', cursor: 'pointer', fontSize: '35px', verticalAlign: 'top', }} onClick={() => this.filterBooksGenre(d.name)}> {d.name} </button> <div style={{ fontSize: '20px', color: 'white', width: '400px', height: '600px' }}> {d.description} </div></li>);
		const authorsList = this.state.authors.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top',}} key={d.author_name}><button id='authorsButton' class='authorsButton' style={{display: 'inline-block', width: '400px', height: '200px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.filterAuthors(d.author_name)}> {d.author_name} </button></li>);

		const booksList = this.state.userBooksList.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top',}} key={d.book_name}><button id='bookButton' class='bookButton' style={{ marginLeft: '50px', display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }}> 
			Name: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Status: {d.book_status} <br></br><br></br> Progress: {d.book_progress} %
		</button></li>);

		const ongoingList = this.state.listOngoing.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top',}} key={d.book_name}><button id='bookButton' class='bookButton' style={{ display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.ongoingBookClicked(d.book_name)}> 
			<p class={d.book_name + '-spec-ongoing'}> Name: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Released: {d.book_released} <br></br><br></br> Progress: {d.book_progress} % </p> 
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-update-ongoing userBookButton'} hidden='true' onClick={() => this.userUpdateBook(d.user_book_id, d.book_progress)}>Update book status</button>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-remove-ongoing userBookButton'} hidden='true' onClick={() => this.userRemoveBook(d.user_book_id)}>Remove book</button>
			<br></br>
		</button></li>);
		const finishedList = this.state.listFinished.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top',}} key={d.book_name}><button id='bookButton' class='bookButton' style={{ display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.finishedBookClicked(d.book_name)}> 
			<p class={d.book_name + '-spec-finished'}> Name: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Released: {d.book_released} </p> 
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-update-finished userBookButton'} hidden='true' onClick={() => this.userUpdateBook(d.user_book_id, d.book_progress)}>Update book status</button>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-remove-finished userBookButton'} hidden='true' onClick={() => this.userRemoveBook(d.user_book_id)}>Remove book</button>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-rate-finished userBookButton'} hidden='true' onClick={() => this.userRateBook(d.book_id)}>Add review</button>
			<br></br>
			{/* <button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-review-finished userBookButton'} hidden='true' onClick={() => this.userReviewBook(d.user_book_id)}>Review book</button>
			<br></br> */}
		</button></li>);
			const plannedList = this.state.listPlanned.map((d) => <li style={{display: 'inline-block', verticalAlign: 'top',}} key={d.book_name}><button id='bookButton' class='bookButton' style={{ display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.plannedBookClicked(d.book_name)}> 
			<p class={d.book_name + '-spec-planned'}> Name: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Released: {d.book_released} </p> 
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-update-planned userBookButton'} hidden='true' onClick={() => this.userUpdateBook(d.user_book_id, d.book_progress)}>Update book status</button>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.book_name + '-remove-planned userBookButton'} hidden='true' onClick={() => this.userRemoveBook(d.user_book_id)}>Remove book</button>
			<br></br>
		</button></li>);

		const usersList = this.state.users.map((d) => <li style={{display: 'inline-block'}} key={d.userName}><br></br><button style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '25px', }} onClick={() => this.showUserReviews(d.userName)}>
			Username: {d.userName} <br></br><br></br> Name: {d.name} <br></br><br></br> Surname: {d.surName} <br></br><br></br> Role: {d.usRole} </button><br></br><br></br><div style={{ textAlign: 'center' }}>
			<button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.resetUserPassword(d.userName)}>Reset password</button>
			<button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.removeUser(d.userName)}>Remove user</button>
			<br></br><br></br>
			<button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '100px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.promote('Administrator', d.userName)}>Promote user to administrator</button>
			<button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '100px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.promote('Moderator', d.userName)}>Promote user to moderator</button>
		</div></li>);

		const booksListAdmin = this.state.adminBooksList.map((d) => <li style={{display: 'inline-block'}} key={d.book_name}><p style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', display: 'inline-block', width: '500px', height: '600px', cursor: 'pointer', fontSize: '25px', }} ><br></br><br></br> Title: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Released: {d.book_released} <br></br><br></br>  Genre: {d.book_genre} <br></br><br></br>  Description: {d.book_description} </p><br></br><br></br><div style={{ textAlign: 'center' }}>
			<button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.removeBook(d.book_id)}>Remove book</button>
			<button class='adminButton' style={{ marginLeft: '50px', display: 'inline-block', width: '300px', height: '50px', cursor: 'pointer', fontSize: '35px', }} onClick={() => this.updateBook(d.book_id, d.book_genre)}>Update book</button>
		</div></li>);

		const reviewsToShow = this.state.reviewsList.map((d) => <li style={{display: 'inline-block'}} key={d.review_id}><button id='bookButton' class={d.review_id + ' bookButton'} style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', color: 'black', display: 'inline-block', width: '1000px', height: '600px', cursor: 'pointer', fontSize: '20px', }} onClick={() => this.reviewClicked(d.review_id, d.book_id)}>
			<br></br> Title: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Rating: <StarRating value={d.review_rating}/> <br></br>  Content: {d.review_content}<br></br><br></br>
			<div style={{ textAlign: 'center' }}>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.review_id + '-update-review userBookButton'} hidden='true' onClick={() => this.userRemoveReview(d.review_id, d.book_id)}>Remove review</button>
			<br></br>
			<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.review_id + '-remove-review userBookButton'} hidden='true' onClick={() => this.userUpdateReview(d.review_id, d.book_id)}>Update review</button>
			<br></br>
		</div></button></li>);

		const userReviews = this.state.userReviewsList.map((d) =>  <li style={{display: 'inline-block'}} key={d.review_id}><button id='bookButton' class={d.review_id + ' bookButton'} style={{ marginLeft: '50px', textAlign: 'center', borderStyle: 'dashed', backgroundColor: 'white', color: 'black', display: 'inline-block', width: '1000px', height: '600px', cursor: 'pointer', fontSize: '20px', }} onClick={() => this.userReviewClicked(d.review_id, d.book_id)}>
		<br></br> Title: {d.book_name} <br></br><br></br> Author: {d.book_author} <br></br><br></br> Rating: <StarRating value={d.review_rating}/> <br></br>  Content: {d.review_content}<br></br><br></br>
		<br></br>
			<button style={{ width: '200px', fontSize: '20px', color: 'white', backgroundColor: '#ff8080', cursor: 'pointer'}} class={d.review_id + '-remove-review-moderator userBookButton'} hidden='true' onClick={() => this.removeUserReview(d.review_id, d.book_id)}>Remove review</button>
		<br></br>
		</button></li>);
		
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
							Create new account
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
							<div id="startPageUser" style={{ width: '100%', height: '10000px', fontSize: '20px', background: '#b30000', }}>
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
										<option value="library-new-books">Titles</option>
										<option value="library-genres">Genres</option>
										<option value="library-authors">Authors</option>
									</select>
									<select class="dropdownUser" id="user-profile" onChange={this.userProfileChange}>
										<option value="" disabled='true' selected>My profile</option>
										<option value="user-stats">My statistics</option>
										<option value="user-info">Profile info</option>
										<option value="user-books">My books</option>
										<option value="user-reviews">My reviews</option>
										{/* <option value="user-list">My list</option> */}
									</select>
									</div>
									<div id="search-box">
										<input id="search-input" type="text" placeholder="Search" style={{ display: 'inline-block', marginLeft: '450px'}} onChange={this.handleSearchChange}/>
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
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Finished books: {this.state.read}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Planned books: {this.state.planned}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Ongoing books: {this.state.ongoing}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Reviews: {this.state.reviews}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Favourite genre: {this.state.favGenre}</p>
												<br></br>
												<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Favourite author: {this.state.favAuthor}</p>
											</div>

										</div>
										<div class='userInformationListDiv' hidden={!this.state.profileInfoChosen} style={{ position: 'absolute', top: '30%', width: '100%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My profile</p>
											<div>
												<div class='photo' style={{ marginLeft: '50px', backgroundImage: `url(${this.state.profilePhoto})`, width: '500px', height: '600px', display: 'inline-block'}}></div>	
												<div class='infoText' style={{display: 'inline-block', marginLeft: '50px', textAlign: 'center'}}>
													<br></br>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Name: {this.state.name}</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Surname: {this.state.surName}</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Nick: {this.state.userName}</p>
													<br></br>
													<p style={{textAlign: 'center',	color: 'white', fontSize: '25px'}}>Date of birth: {this.state.dateOfBirth}</p>
													<br></br>
													<br></br>
													<br></br>
												</div>
											</div>
											<br></br>
											<button class='userButton' id='userButton' onClick={this.updateProfilePopup}>Update profile</button>
											<button class='userButton' id='userButton' onClick={this.showDeletePopup}>Delete account</button>

										</div>
										<div class='userBooksDiv' hidden={!this.state.booksChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My books</p>
											<hr></hr>
											<p style={{ marginLeft: '50px', textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '20px'}}>Ongoing</p>
											<hr></hr>
											<div style={{ marginLeft: '50px',}}>
												{ongoingList}
											</div>
											<hr></hr>
											<p style={{ marginLeft: '50px', textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '20px'}}>Finished</p>
											<hr></hr>
											<div style={{ marginLeft: '50px',}}>
												{finishedList}
											</div>
											<hr></hr>
											<p style={{ marginLeft: '50px', textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '20px'}}>Planned</p>
											<hr></hr>
											<div style={{ marginLeft: '50px',}}>
												{plannedList}
											</div>
										</div>
										<div class='userReviewsDiv' hidden={!this.state.reviewsChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>My reviews</p>
											<div style={{ textAlign: 'center', color: 'white', fontSize: '50px' }}>
												{reviewsToShow}
											</div>

										</div>

										<div className="modalUpdateUserBook" hidden='true'>
											<div className="modal_content">
												<span className="close" onClick={this.handleClickCloseUpdateUserBookPopup}>
													&times;
												</span>
												<h2 style={{textAlign: 'center'}}>Choose new status or update progress</h2>
												<div style={{ textAlign: 'center'}}>
													<select class="dropdownUserStatus" id="app-library" style={{ marginLeft: '20px', height: '40px', width: '500px'}} onChange={this.handleChangeUpdateBookStatus}>
														<option value="" disabled='true' selected>Status</option>
														<option value="Ongoing">Ongoing</option>
														<option value="Finished">Finished</option>
														<option value="Planned">Planned</option>
													</select>
													<br></br>
													<br></br>
													<p style={{ marginLeft: '20px', height: '30px', width: '500px'}}>Progress: {this.state.inputUpdateBookProgress} %</p>
													<br></br>
													<label>
													<input type="range" min="1" max="100" defaultValue="1" onChange={this.handleChangeUpdateBookProgress} style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
													<br></br>
													{/* <label>
													<input type="password" name="name" onChange={this.handleChangeUpdateBookPassword} placeholder='Password' style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label> */}
												</div>
												<br />
												<div style={{ textAlign: 'center'}}> 
													<button id="submitButton" class="submitButton" onClick={this.handleSubmitUpdateBookPopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
												</div>
											</div>
										</div>

										<div className="modalRateUserBook" hidden='true'>
											<div className="modal_content">
												<span className="close" onClick={this.handleClickCloseRateUserBookPopup}>
													&times;
												</span>
												<h2 style={{textAlign: 'center'}}>Choose rating of selected book</h2>
												<h2 style={{textAlign: 'center'}}>{this.rateStatusText}</h2>
												<div style={{ textAlign: 'center'}}>

												<StarRating value={3}/>

													<label>
														<input type="text" name="name" onChange={this.handleChangeRateBookContent} placeholder='Review content' style={{ marginLeft: '20px', height: '90px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
												</div>
												<br />
												<div style={{ textAlign: 'center'}}> 
													<button id="submitButton" class="submitButton" onClick={this.handleSubmitRateBookPopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
												</div>
											</div>
										</div>

										<div className="modalUpdateRateUserBook" hidden='true'>
											<div className="modal_content">
												<span className="close" onClick={this.handleClickCloseUpdateRateUserBookPopup}>
													&times;
												</span>
												<h2 style={{textAlign: 'center'}}>Choose rating of selected book</h2>
												<h2 style={{textAlign: 'center'}}>{this.rateStatusText}</h2>
												<div style={{ textAlign: 'center'}}>

												<StarRating value={3}/>

													<label>
														<input type="text" name="name" onChange={this.handleChangeRateBookContent} placeholder='Review content' style={{ marginLeft: '20px', height: '90px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
												</div>
												<br />
												<div style={{ textAlign: 'center'}}> 
													<button id="submitButton" class="submitButton" onClick={this.handleSubmitUpdateRateBookPopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
												</div>
											</div>
										</div>

										<div className="modalDelete" hidden='true'>
											<div className="modal_content">
											<span className="close" onClick={this.handleClickDeletePopup}>
												&times;
											</span>
												<h2 style={{textAlign: 'center'}}>Type in your password to delete account</h2>
												<div style={{ textAlign: 'center'}}>
													<label>
													Password:
													<input type="password" name="name" onChange={this.handleChangeDeletePopup} placeholder='Password' style={{ marginLeft: '20px', height: '30px', width: '300px'}}/>
													</label>
												</div>
												<br />
												<div style={{ textAlign: 'center'}}> 
													<button id="submitButton" class="submitButton" onClick={this.handleSubmitDeletePopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
												</div>
											</div>
										</div>

										<div className="modalUpdate" hidden='true'>
											<div className="modal_content">
											<span className="close" onClick={this.handleClickCloseUpdatePopup}>
												&times;
											</span>
												<h2 style={{textAlign: 'center'}}>Type in your data you want to update</h2>
												<div style={{ textAlign: 'center'}}>
													<label>
													<input type="text" name="name" onChange={this.handleChangeUpdateNamePopup} placeholder='Name' style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
													<label>
													<input type="text" name="name" onChange={this.handleChangeUpdateSurnamePopup} placeholder='Surname' style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
													<label>
													<input type="text" name="name" onChange={this.handleChangeUpdateDateOfBirth} placeholder='Date of birth (for example YYYY-MM-DD)' style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
													<label>
													<input type="text" name="name" onChange={this.handleChangeUpdateNewPassword} placeholder='New password' style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label>
													<br></br>
													<br></br>
													<h2 style={{ textAlign: 'center', fontSize: '30px' }}>
														Type in current password to update user data
													</h2>
													<br></br>
													<label>
													<input type="password" name="name" onChange={this.handleChangeUpdateOldPassword} placeholder='Current password' style={{ marginLeft: '20px', height: '30px', width: '500px'}}/>
													</label>
												</div>
												<br />
												<div style={{ textAlign: 'center'}}> 
													<button id="submitButton" class="submitButton" onClick={this.handleSubmitUpdatePopup} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Confirm</button>
												</div>
											</div>
										</div>
										{/* <div class='userListDiv' hidden={!this.state.listChosen} style={{ position: 'absolute', top: '30%', width: '100%'  }}>
											<p style={{ marginLeft: '50px', textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Ongoing</p>
											<hr></hr>
											<div>
												{ongoingList}
											</div>
											<hr></hr>
											<p style={{ marginLeft: '50px', textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Finished</p>
											<hr></hr>
											<div>
												{finishedList}
											</div>
											<hr></hr>
											<p style={{ marginLeft: '50px', textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Planned</p>
											<hr></hr>
											<div>
												{plannedList}
											</div>

										</div> */}
									</div>
								</div>
							</div>
						</div>
						)
						:
						(
							// backgroundImage: `url(${background})`
							<div id="startPageUser" style={{ width: '100%', height: '10000px', fontSize: '20px', background: '#b30000', }}>
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
										<option value="library-new-books">Titles</option>
										<option value="library-genres">Genres</option>
										<option value="library-authors">Authors</option>
									</select>
									<select class="dropdownUser" id="user-profile" onChange={this.userProfileChange}>
										<option value="" disabled='true' selected>My profile</option>
										<option value="user-stats">My statistics</option>
										<option value="user-info">Profile info</option>
										<option value="user-books">My books</option>
										<option value="user-reviews">My reviews</option>
										{/* <option value="user-list">My list</option> */}
									</select>
									</div>
									<br></br>
									<div id="search-box">
										<select class="dropdownUserFilter" id="user-profile" style={{ display: 'inline-block', width: '200px' }}>
											<option value="" disabled='true' selected>Filter</option>
											<option value="name">Title</option>
											<option value="author">Author</option>
											<option value="genre">Genre</option>
											<option value="release_date">Release date</option>
										</select>
										<input id="search-input" type="text" placeholder="Search" style={{ display: 'inline-block'}} onChange={this.handleSearchChange}/>
									</div>
								</div>
								
							</div>
							<hr></hr>
							<div style={{ display: 'block', backgroundColor: '#b30000' }}>
								
								<div class='toView'>
									{/* <p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '60px'}}>{[this.state.libraryText]}</p> */}
									<div style={{display: 'inline-block'}}>
										<div class='titlesBooksListDiv' hidden={!this.state.newBooksChosen} style={{ position: 'absolute', top: '30%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Titles</p>
											<div class='titlesBooksListView' style={{ marginLeft: '50px', height: '600px'}}>
												{titlesBooksList}
											</div>
										</div>
										<div class='genresListDiv' hidden={!this.state.genresChosen} style={{ position: 'absolute', top: '30%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Genres</p>
											<div class='genresListView' style={{ marginLeft: '50px', height: '600px' }}>
												{genresList}
											</div>
										</div>
										<div class='authorsListDiv' hidden={!this.state.authorsChosen} style={{ position: 'absolute', top: '30%' }}>
											<p style={{textAlign: 'center',	color: 'white',	backgroundColor: '#b30000', fontSize: '30px'}}>Authors</p>
											<div class='authorsListView' style={{ marginLeft: '50px', height: '600px'}}>
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
									<option value="name">Title</option>
									<option value="author">Author</option>
									<option value="genre">Genre</option>
									<option value="release_date">Release date</option>
								</select>
								<input style={{display: 'inline-block'}} id="search-input" type="text" placeholder="Search" onChange={this.handleSearchChangeAdmin} />
							</div>
								<br></br>								

								<div className="modalDelete" hidden='true'>
									<div className="modal_content">
									<span className="close" onClick={this.handleClickDeletePopup}>
										&times;
									</span>
										<h2 style={{textAlign: 'center'}}>Type in your password to delete Account</h2>
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
							<button class='adminButtonBook' id="bottom" style={{marginLeft: '20px'}} onClick={this.updateAdminBooksList}>Update book list</button>
								<button class='adminButtonBook' id="bottom" style={{marginLeft: '20px'}} onClick={this.addNewBookPressed}>Add new book</button>
								<button class='adminButtonBook' id="bottom" style={{marginLeft: '20px'}} onClick={this.addNewGenrePressed}>Add new genre</button>
							</div>

							<hr></hr>
							<br></br>
							<div style={{width: '800px', height: '600px', alignContent: 'center'}}>
								{booksListAdmin}
							</div>

							<div className="modalNewBook" hidden='true'>
								<div className="modal">
									<h2 style={{textAlign: 'center'}}>Type in book name and author</h2>
									<br></br>
									<h2 style={{textAlign: 'center'}}>{this.state.modalNewBookStatus}</h2>
									<div style={{ textAlign: 'center'}}> 
										<input type="text" name="name" onChange={this.handleChangeNewBookName} placeholder='Name' style={{ display: 'block', height: '30px', width: '800px'}}/>
										<br></br>
										<input type="text" name="name" onChange={this.handleChangeNewBookAuthor} placeholder='Author' style={{ display: 'block', height: '30px', width: '800px'}}/>
									</div>
									<br></br>
									<div style={{ textAlign: 'center'}}> 
										<button id="submitButton" class="submitButton" onClick={this.handleSubmitNewBook} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Add book</button>
										<button id="submitButton" class="submitButton" onClick={this.handleSubmitNewBookCancel} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Cancel</button>
									</div>
								</div>
							</div>

							<div className="modalNewGenre" hidden='true'>
								<div className="modal">
									<h2 style={{textAlign: 'center'}}>Type in genre name and description</h2>
									<br></br>
									<h2 style={{textAlign: 'center'}}>{this.state.modalNewGenreStatus}</h2>
									<div style={{ textAlign: 'center'}}> 
										<input type="text" name="name" onChange={this.handleChangeNewGenreName} placeholder='Name' style={{ display: 'block', height: '30px', width: '800px'}}/>
										<br></br>
										<input type="text" name="name" onChange={this.handleChangeNewGenreDescription} placeholder='Description' style={{ display: 'block', height: '90px', width: '800px'}}/>
									</div>
									<br></br>
									<div style={{ textAlign: 'center'}}> 
										<button id="submitButton" class="submitButton" onClick={this.handleSubmitNewGenre} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Add genre</button>
										<button id="submitButton" class="submitButton" onClick={this.handleSubmitNewGenreCancel} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Cancel</button>
									</div>
								</div>
							</div>

							<div className="modalUpdateBook" hidden='true'>
								<div className="modal">
									<h2 style={{textAlign: 'center'}}>Type in updated release date of book, genre and description</h2>
									<br></br>
									<div style={{ textAlign: 'center'}}> 
										<input type="text" name="name" onChange={this.handleChangeUpdateBookDate} placeholder='Date released (for example YYYY-MM-DD)' style={{ display: 'block', height: '30px', width: '800px'}}/>
									</div>
									<br></br>
									<div style={{ textAlign: 'center'}}> 
										<input type="text" name="name" onChange={this.handleChangeUpdateBookGenre} placeholder='Genre' style={{ display: 'block', height: '30px', width: '800px'}}/>
									</div>
									<br></br>
									<div style={{ textAlign: 'center'}}> 
										<input type="text" name="name" onChange={this.handleChangeUpdateBookDescription} placeholder='Description' style={{ display: 'block', height: '90px', width: '800px'}}/>
									</div>
									<br></br>
									<div style={{ textAlign: 'center'}}> 
										<button id="submitButton" class="submitButton" onClick={this.handleSubmitUpdateBook} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Update book</button>
										<button id="submitButton" class="submitButton" onClick={this.handleSubmitUpdateBookCancel} style={{ cursor: 'pointer', height: '30px', width: '400px' }}>Cancel</button>
									</div>
								</div>
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

							<div className="modalResetPass" hidden='true'>
								<div className="modal_content_reset">
								<span className="close" onClick={this.handleClickDeleteReset}>
									&times;
								</span>
									<h2 style={{textAlign: 'center'}}>{this.state.resetUserPass} for user: {this.state.resetUserLogin}.</h2>
								</div>
							</div>

							<div id="pageAfterLogin" class="pageAfterLogin" style={{ display: 'flex', flexDirection: 'row', }}>

								<div style={{width: '100%', marginLeft: '300px'}}>
									<select class="dropdownMode" id="user-profile" style={{ display: 'inline-block', width: '200px' }}>
										<option value="" disabled='true' selected>Filter</option>
										<option value="user_login">Username</option>
										<option value="user_name">Name</option>
										<option value="user_surname">Surname</option>
										<option value="role">Role</option>
									</select>
									<input style={{display: 'inline-block'}} id="search-input" type="text" placeholder="Search" onChange={this.handleSearchChangeMode}/>
									{/* <span id="filter" class="user-select-pure">Select Pure</span> */}
								</div>
								

								<div className="modalDelete" hidden='true'>
									<div className="modal_content">
									<span className="close" onClick={this.handleClickDeletePopup}>
										&times;
									</span>
										<h2 style={{textAlign: 'center'}}>Type in your password to delete account</h2>
										<div style={{ textAlign: 'center'}}>
											<label>
											Password:
											<input type="password" name="name" onChange={this.handleChangeDeletePopup} placeholder='Password' style={{ marginLeft: '20px', height: '30px', width: '300px'}}/>
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
								<button style={{}} id="modeButton" class='modeButton' onClick={this.getUsersList}>Update users list</button>
								{usersList}
							</div>
							
							<div className="modalUserReviews" hidden='true'>
								<div className="modal_content">
									<span className="close" onClick={this.handleClickCloseUserReviewsPopup}>
										&times;
									</span>
									{userReviews}
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