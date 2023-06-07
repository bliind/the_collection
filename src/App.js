import React, {Component} from 'react'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import AuthRoute from './components/AuthRoute'
import Gallery from './components/Gallery'
import {AppContext} from './contexts/AppContext'
import RegisterForm from './components/RegisterForm'
import CardForm from './components/CardForm'
import LogoutPage from './components/LogoutPage'

class App extends Component {
    constructor(props) {
        super(props);

        let user = null;
        const username = this.getCookie('username');
        const token = this.getCookie('token');
        const editor = this.getCookie('editor');
        const bad = ['undefined', ''];
        if (!bad.includes(token) && !bad.includes(username)) {
            user = {username, token, editor};
        }

        const dummyCards = [];
        const dummyCard = {
            card_name: '',
            variant_name: '',
            artist_name: '',
            image_link: 'noimage.webp',
            video_link: '',
            release_status: 'UNRELEASED',
            video_status: 'NEEDED',
            tags: '',
        }
        for (let i = 0; i < 100; i++) {
            dummyCards.push(dummyCard);
        }

        this.state = {
            user: user,
            init: false,
            cards: dummyCards,
            urlBase: 'https://snaptracker.me/collection',
        };

        this.setUser = this.setUser.bind(this);
        this.addCard = this.addCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    getCookie(cname) {
        const name = cname + '=';
        const ca = decodeURIComponent(document.cookie);
        for (let c of ca.split(';')) {
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    }

    setUser(user) {
        this.setState({...this.state, user: user})
    }

    addCard(card) {
        const newCards = [...this.state.cards, card];
        this.setState({...this.state, cards: newCards});
    }

    updateCard(id, cardData) {
        const cards = this.state.cards.map(card => {
            if (card.id === id) {
                for (let field in cardData) {
                    card[field] = cardData[field];
                }
            }

            return card
        });
        this.setState(() => ({cards}));
    }

    componentDidMount() {
        if (this.state.init === false) {
            const {urlBase} = this.state;
            fetch(`${urlBase}/api/getAll?v=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                this.setState({...this.state, init: true, cards: data})
            })
        }
    }

    render() {
        const {init, user, cards, urlBase} = this.state;

        return (
            <Router>
                <AppContext.Provider value={{
                    init,
                    cards,
                    user,
                    urlBase,
                    addCard: this.addCard,
                    updateCard: this.updateCard,
                    setUser: this.setUser,
                }}>
                    <AuthRoute user={user} path='/collection/add'>
                        <CardForm action='Add' />
                    </AuthRoute>

                    <AuthRoute user={user} path='/collection/edit/:id'>
                        <CardForm action='Edit' />
                    </AuthRoute>

                    <Route path='/collection/login'>
                        {user !== null ? <Redirect to='/collection' /> : <LoginForm />}
                    </Route>

                    <Route path='/collection/logout'>
                        {user === null ? <Redirect to='collection' /> : <LogoutPage />}
                    </Route>

                    <Route path='/collection/register'>
                        {user !== null ? <Redirect to='/collection' /> : <RegisterForm />}
                    </Route>

                    <Route exact path='/collection'>
                        <Gallery />
                    </Route>
                </AppContext.Provider>
            </Router>
        )
    }
}

export default App
