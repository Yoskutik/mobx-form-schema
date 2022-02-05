import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import React from 'react';
import { injectable } from 'tsyringe';
import { makeObservable } from 'mobx';
import { SignUpPage } from './SignUp/SignUpPage';
import { ToastsContainer } from '@components';
import { AuthService } from '@services';
import './Style.scss';

@injectable()
export class AppViewModel extends ViewModel {
  constructor(public authService: AuthService) {
    super();
    makeObservable(this);
  }
}

export const App = view(AppViewModel)(({ viewModel }) => <>
    {!viewModel.authService.isAuthed && <SignUpPage/>}
    <ToastsContainer/>
</>);
