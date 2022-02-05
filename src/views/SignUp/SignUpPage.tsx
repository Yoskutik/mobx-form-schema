import React from 'react';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'tsyringe';
import { SignUpModel } from './SignUpModel';
import { HFlexBox, VFlexBox, TextField, Button, LoadingMask } from '@components';
import { ApiEmulator, ToastsService } from '@services';

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
    this.api.signUp(this.model.login, this.model.password).then(() => {
      this.isLoading = false;
      this.toastService.make(`You've been signed up as ${this.model.login}`);
    });
  };
}

export const SignUpPage = view(SignUpPageViewModel)(({ viewModel }) => (
    <VFlexBox cls="login-page">
        <VFlexBox cls="login-page__form">
            <TextField model={viewModel.model} name="login" label="Login" style={{ marginBottom: 16 }} required/>
            <TextField model={viewModel.model} name="password" type="password" label="Password"
                style={{ marginBottom: 16 }} required/>
            <HFlexBox justify="center">
                <Button text="Sing up" onClick={viewModel.onSignUpClick} disabled={!viewModel.model.isValid}/>
            </HFlexBox>
            {viewModel.isLoading && <LoadingMask/>}
        </VFlexBox>
    </VFlexBox>
));
