import React, { Component } from 'react'
import SelectBox from './form/SelectBox'
import TextInput from './form/TextInput'
import Buttons from './form/Buttons'
import { Link, withRouter } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import FileField from './form/FileField'

export class CardForm extends Component {
    constructor(props) {
        super(props);

        const form = {
            card_name: '',
            variant_name: '',
            artist_name: '',
            image_file: '',
            image_file_name: '',
            video_link: '',
            release_status: '',
            tags: '',
        };

        this.state = {
            card: {},
            editID: false,
            form: form,
            loading: false,
            error: '',
            fieldError: '',
        }

        this.submit = this.submit.bind(this)
        this.reset = this.reset.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.componentDidUpdate(this.props);
    }

    componentDidUpdate() {
        if (this.state.editID !== false) return

        const {id} = this.props.match.params;
        if (id === undefined) return
        const card = this.context.cards.find(card => parseInt(card.id) === parseInt(id));
        if (card) {
            this.setState(() => ({
                card: card,
                editID: card.id,
                form: {
                    card_name: card.card_name,
                    variant_name: card.variant_name,
                    artist_name: card.artist_name,
                    image_file: '',
                    image_file_name: card.image_link,
                    video_link: card.video_link,
                    release_status: card.release_status,
                    tags: card.tags,
                }
            }));
        }
    }

    handleChange(e) {
        const {name, value, validity} = e.target;
        if (validity.valid || value === '') {
            const newForm = {...this.state.form};
            newForm[name] = value;
            this.setState({...this.state, form: newForm});
        }

        if (name === 'image_file') {
            const {card_name, variant_name, artist_name} = this.state.form;
            const cardName = card_name?.replace(' ', '');
            const variantName = variant_name?.replace(' ', '');
            const artistName = artist_name?.replace(' ', '');
            const extension = value.split('.').reverse()[0];

            const image_file_name = `${cardName}${variantName ? variantName : artistName}.${extension}`;
            this.setState({...this.state, form: {...this.state.form, image_file_name}});
        }
    }

    submit(e) {
        e.preventDefault();

        this.setState(() => ({loading: true}));

        const formdata = new FormData(this.formElem);
        for (let entry of formdata) { console.log(entry) }
        formdata.append('token', this.context.user.token)

        const {urlBase} = this.context;
        let url = `${urlBase}/api/insert`;
        if (this.props.action === 'Edit') {
            url = `${urlBase}/api/update/${this.state.editID}`
        }

        fetch(url, {
            'method': 'POST',
            'body': formdata
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data['error'] !== 'undefined') {
                const match = /(\w+) is required/.exec(data['error']);
                if (match) {
                    this.setState(() => ({fieldError: match[1]}));
                } else {
                    this.setState(() => ({error: data['error']}));
                }
            }

            this.setState(() => ({loading: false}));

            if (typeof data['error'] === 'undefined') {
                // success, add pop go home
                if (this.props.action === 'Edit') {
                    this.context.updateCard(this.state.editID, data)
                } 
                if (this.props.action === 'Add') {
                    this.context.addCard(data);
                }
                this.props.history.push('/collection')
            }
        });
    }

    reset(e) {
        this.setState({
            ...this.state,
            form:  {
                card_name: '',
                variant_name: '',
                artist_name: '',
                image_file: '',
                image_file_name: '',
                video_link: '',
                release_status: '',
                tags: '',
            }
        })
    }

    render() {
        const {error, fieldError, loading} = this.state;
        const {
            card_name,
            variant_name,
            artist_name,
            image_file,
            image_file_name,
            video_link,
            release_status,
            tags
        } = this.state.form;
        const {action} = this.props;

        return (
            <div className='container'>
                <div className='header'>
                    <h2>{action} Card</h2>
                </div>
                <form ref={form => this.formElem = form} onSubmit={this.submit} onReset={this.reset}>
                    {error ? (
                        <div className='error'>
                            {error}
                        </div>
                    ) : ''}
                    <TextInput id='card_name' fieldError={fieldError} label='Card Name' value={card_name} onChange={this.handleChange} />
                    <TextInput id='variant_name' fieldError={fieldError} label='Variant Name' value={variant_name} onChange={this.handleChange} />
                    <TextInput id='artist_name' fieldError={fieldError} label='Artist Name' value={artist_name} onChange={this.handleChange} />
                    <FileField id='image_file' fieldError={fieldError} label='Image File' value={image_file} onChange={this.handleChange} />
                    <TextInput id='image_file_name' fieldError={fieldError} label='Image Filename' value={image_file_name} onChange={this.handleChange} />
                    <TextInput id='video_link' fieldError={fieldError} label='Video Link' value={video_link} onChange={this.handleChange} />
                    <SelectBox id='release_status' fieldError={fieldError} label='Release Status' value={release_status} onChange={this.handleChange} options={['RELEASED', 'UNRELEASED']} />
                    <TextInput id='tags' fieldError={fieldError} label='Tags (Comma Separated)' value={tags} onChange={this.handleChange} />
                    <Buttons label={`${action} Card`} loading={loading} />
                </form>
                <Link className='top-right-link' to='/collection'>Back</Link>
            </div>
        )
    }
}

CardForm.contextType = AppContext;

export default withRouter(CardForm)
