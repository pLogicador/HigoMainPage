import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { Input, Button } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import FormControl from 'components/UI/FormControl/FormControl';
import Wrapper, {
  Title,
  TitleInfo,
  FormWrapper,
  BannerWrapper,
} from './Auth.style';

export default function ForgetPassWord() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Logo
          withLink
          linkTo="/"
          src="/images/logotipo_2.svg"
          title="Higo Viagens"
        />
        <Title>Bem-vindo</Title>
        <TitleInfo>Digite seu email para recuperação</TitleInfo>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Email"
            htmlFor="email"
            error={
              errors.email && (
                <>
                  {errors.email?.type === 'required' && (
                    <span>Este campo é obrigatório!</span>
                  )}
                  {errors.email?.type === 'pattern' && (
                    <span>Por favor insira um endereço de e-mail válido!</span>
                  )}
                </>
              )
            }
          >
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="email"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </FormControl>
          <Button
            className="signin-btn"
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
          >
            <MdEmail />
            Enviar email
          </Button>
        </form>
      </FormWrapper>
      <BannerWrapper>
        <img src="/images/login-page-bg.jpg" alt="Auth page banner" />
      </BannerWrapper>
    </Wrapper>
  );
}
