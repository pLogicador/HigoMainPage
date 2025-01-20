import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Row, Col } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { FormTitle } from './AccountSettings.style';

export default function ChangePassWord() {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <FormTitle>Mudar senha</FormTitle>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={30}>
          <Col lg={12} xs={24}>
            <FormControl
              label="Enter old password"
              htmlFor="oldPassword"
              error={errors.oldPassword && <span>Essa informação é obrigatoria!</span>}
            >
              <Controller
                name="oldPassword"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Password
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </Col>
          <Col lg={12} xs={24}>
            <FormControl
              label="Enter new password"
              htmlFor="newPassword"
              error={
                errors.newPassword && (
                  <>
                    {errors.newPassword?.type === 'required' && (
                      <span>Essa informação é obrigatoria!</span>
                    )}
                    {errors.newPassword?.type === 'minLength' && (
                      <span>A nova senha deve ter pelo menos 6 caracteres!</span>
                    )}
                    {errors.newPassword?.type === 'maxLength' && (
                      <span>
                         A nova senha não deve ter mais de 20 caracteres!
                      </span>
                    )}
                  </>
                )
              }
            >
              <Controller
                name="newPassword"
                defaultValue=""
                control={control}
                rules={{ required: true, minLength: 6, maxLength: 20 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Password
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </Col>
          <Col lg={24} xs={24}>
            <FormControl
              label="Confirm new password"
              htmlFor="confirmPassword"
              error={
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <span>A senha de confirmação deve ser a mesma!</span>
                )
              }
            >
              <Controller
                name="confirmPassword"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Password
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </Col>
          <Col lg={24}>
            <div className="submit-container">
              <Button htmlType="submit" type="primary">
                Salvar mudanças
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
}
