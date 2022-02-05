import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'tsyringe';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { VBox, TextField, Form } from '@components';
import { ApiEmulator, ToastsService } from '@services';
import { SignUpModel } from './SignUpModel';

@injectable()
class SignUpPageViewModel extends ViewModel {
  readonly model = SignUpModel.create();

  @observable isLoading = false;

  constructor(
    private api: ApiEmulator,
    private toastService: ToastsService,
  ) {
    super();
    makeObservable(this);
  }

  @action onSignUpClick = (): void => {
    this.isLoading = true;
    this.api.signUp(this.model.state).then(() => {
      this.isLoading = false;
      this.toastService.make(`You've been signed up as ${this.model.login}`);
    });
  };
}

export const SignUpPage = view(SignUpPageViewModel)(({ viewModel }) => (
    <VBox cls="login-page">
      <Form
        isLoading={viewModel.isLoading}
        cls="login-page__form"
        buttonText="Sign up"
        onClick={viewModel.onSignUpClick}
        disabled={!viewModel.model.isValid}
      >
        <TextField model={viewModel.model} name="login" required/>
        <TextField model={viewModel.model} name="password" type="password" required/>
      </Form>
    </VBox>
));
