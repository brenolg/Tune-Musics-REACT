import React from 'react';
import propTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      // updatedData: [],
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',

    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      loading: false,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      description: userInfo.description,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleButton = () => {
    const { name, email, image, description } = this.state;
    const nameL = name.length > 0;
    const imageL = image.length > 0;
    const emailCheck = email.length > 0 && email.includes('@');
    const desL = description.length > 0;
    return !(nameL && imageL && emailCheck && desL);
  };

  handleClick = async () => {
    this.setState({ loading: true });
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    const updatedForm = { name, email, image, description };

    await updateUser(updatedForm);
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <>

        <div data-testid="page-profile-edit">
          <Header />
        </div>
        {loading && (<p>Carregando...</p>)}

        <form>

          <label htmlFor="edit-name">
            Nome
            <input
              value={ name }
              onChange={ this.handleChange }
              data-testid="edit-input-name"
              name="name"
              type="text"
            />
          </label>

          <label htmlFor="input-email">
            Email
            <input
              value={ email }
              onChange={ this.handleChange }
              data-testid="edit-input-email"
              name="email"
              type="email"
            />

          </label>

          <label htmlFor="input-description">
            Descrição
            <input
              id='"input-description"'
              value={ description }
              onChange={ this.handleChange }
              data-testid="edit-input-description"
              type="text"
              name="description"
            />
          </label>

          <label htmlFor="input-image">
            Imagem
            <input
              value={ image }
              name="image"
              onChange={ this.handleChange }
              data-testid="edit-input-image"
              type="input-image"
            />
          </label>

          <button
            type="button"
            data-testid="edit-button-save"
            onClick={ this.handleClick }
            disabled={ this.handleButton() }
          >
            Editar

          </button>

        </form>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
