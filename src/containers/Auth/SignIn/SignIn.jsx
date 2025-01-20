import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import { REGISTRATION_PAGE } from 'settings/constant';
import SignInForm from './SignInForm';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';

const SignIn = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Logo
          withLink
          linkTo="/"
          src="/images/logotipo_2.svg"
          title="Higo Viagens"
        />
        <Title>Bem vindo de volta</Title>
        <TitleInfo>Por favor faça login em sua conta</TitleInfo>
        <SignInForm />
        <Divider>Ou faça login com </Divider>
        <SocialLogin />
        <Text>
        Não tem uma conta?&nbsp;
          <Link to={REGISTRATION_PAGE}>Registre-se</Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <img src="/images/Banner_Site_Promo_Celular.jpg" alt="Auth page banner" />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignIn;
