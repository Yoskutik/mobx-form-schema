import React from 'react';
import { injectable } from 'tsyringe';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { Form, HBox, TextField } from '@components';
import { UserModel } from './UserModel';
import { ToastsService } from '@services';
import { CoolerUserModel } from './CoolerUserModel';
import { ListField } from '../../components/ListField';
import { AwesomeUserModel } from './AwesomeUserModel';

@injectable()
class MainViewModel extends ViewModel {
  readonly user = UserModel.create(JSON.parse(sessionStorage.getItem('user-data')));

  readonly coolUser = CoolerUserModel.create();

  readonly awesomeUser = AwesomeUserModel.create();

  constructor(private toastsService: ToastsService) {
    super();
  }

  onUserSaveClick = () => {
    this.user.commit();
    sessionStorage.setItem('user-data', JSON.stringify(this.user.state));
    this.toastsService.make('User data was updated');
  };

  onCoolUserSaveClick = () => {
    this.coolUser.commit();
    this.toastsService.make('Cool user data was updated');
  };

  onAwesomeUserSaveClick = () => {
    this.awesomeUser.commit();
    this.toastsService.make('Awesome user data was updated');
  };
}

export const Main = view(MainViewModel)(({ viewModel }) => (
  <HBox cls="main-page" align="start">
    <Form
      title="User form"
      cls="main-page__form"
      disabled={!viewModel.user.isDirty || !viewModel.user.isValid}
      buttonText="Save"
      onClick={viewModel.onUserSaveClick}
    >
      <TextField model={viewModel.user} name="name"/>
      <TextField model={viewModel.user} name="surname"/>
      <TextField model={viewModel.user} name="username"/>
      <TextField model={viewModel.user} name="email"/>
      <TextField model={viewModel.user} name="address"/>
      <ListField model={viewModel.user} name="interests"/>
    </Form>

    <Form
      title="Cool user form (overrided)"
      cls="main-page__form"
      disabled={!viewModel.coolUser.isDirty || !viewModel.coolUser.isValid}
      buttonText="Save"
      onClick={viewModel.onCoolUserSaveClick}
    >
      <TextField model={viewModel.coolUser} name="name"/>
      <TextField model={viewModel.coolUser} name="surname"/>
      <TextField model={viewModel.coolUser} name="username"/>
      <TextField model={viewModel.coolUser} name="email"/>
      <TextField model={viewModel.coolUser} name="address"/>
      <ListField model={viewModel.coolUser} name="interests"/>
    </Form>

    <Form
      title="Awesome user form (extended)"
      cls="main-page__form"
      disabled={!viewModel.awesomeUser.isDirty || !viewModel.awesomeUser.isValid}
      buttonText="Save"
      onClick={viewModel.onAwesomeUserSaveClick}
    >
      <TextField model={viewModel.awesomeUser} name="name"/>
      <TextField model={viewModel.awesomeUser} name="surname"/>
      <TextField model={viewModel.awesomeUser} name="username"/>
      <TextField model={viewModel.awesomeUser} name="email"/>
      <TextField model={viewModel.awesomeUser} name="address"/>
      <ListField model={viewModel.awesomeUser} name="interests"/>
      <ListField model={viewModel.awesomeUser} name="friends"/>
      <TextField model={viewModel.awesomeUser} name="job"/>
    </Form>
  </HBox>
));
