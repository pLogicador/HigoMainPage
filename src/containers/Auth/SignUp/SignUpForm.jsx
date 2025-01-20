import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';

const SignUpForm = () => {
  const { signUp, loggedIn } = useContext(AuthContext);
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const onSubmit = (data) => {
    signUp(data);
  };
  if (loggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="Nome de Usuário"
        htmlFor="username"
        error={
          errors.username && (
            <>
              {errors.username?.type === 'required' && (
                <span>Este campo é obrigatório!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="username"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>
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
      <FormControl
        label="Senha"
        htmlFor="password"
        error={
          errors.password && (
            <>
              {errors.password?.type === 'required' && (
                <span>Este campo é obrigatório!</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span>A senha deve ter pelo menos 6 caracteres!</span>
              )}
              {errors.password?.type === 'maxLength' && (
                <span>A senha não deve ter mais de 20 caracteres!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{ required: true, minLength: 6, maxLength: 20 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Password onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>
      <FormControl
        label="Confirmar senha"
        htmlFor="confirmPassword"
        error={
          confirmPassword &&
          password !== confirmPassword && (
            <span>Sua senha não é a mesma!</span>
          )
        }
      >
        <Controller
          name="confirmPassword"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Password onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Controller
            control={control}
            name="rememberMe"
            valueName="checked"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Switch onChange={onChange} checked={value} />
            )}
          />
          <Label>Lembrar-me</Label>
        </SwitchWrapper>
        <SwitchWrapper>
          <Controller
            control={control}
            name="termsAndConditions"
            valueName="checked"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Switch onChange={onChange} checked={value} />
            )}
          />
          <Label>Concordo com os termos e condições</Label>
        </SwitchWrapper>
      </FieldWrapper>
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
        <MdLockOpen />
        Registrar
      </Button>
    </form>
  );
};

export default SignUpForm;
