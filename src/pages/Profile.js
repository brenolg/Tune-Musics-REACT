import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.saveInfo();
  }

  saveInfo = async () => {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userInfo,
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    return (
      <>
        {loading && (<p>Carregando...</p>)}

        <div data-testid="page-profile">
          <Header />
          <img
            data-testid="profile-image"
            src={ userInfo.image }
            alt={ userInfo.name }
          />
          <p>
            {userInfo.name}
          </p>

          <p>
            {userInfo.email}
          </p>

          <p>
            {userInfo.description}
          </p>

          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
