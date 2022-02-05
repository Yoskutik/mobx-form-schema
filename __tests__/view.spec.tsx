import 'reflect-metadata';
import '@testing-library/jest-dom';
import React from 'react';
import { childView, view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { container, injectable, singleton } from 'tsyringe';
import { render, waitFor } from '@testing-library/react';
import {configure, makeObservable, observable} from 'mobx';

configure({ enforceActions: "never" });

describe('View checking', () => {
    test('Testing observable fields', async () => {
        @singleton()
        class SomeViewModel extends ViewModel {
            @observable n = 0;

            constructor() {
                super();
                makeObservable(this);
            }
        }

        const viewModel = container.resolve(SomeViewModel);
        const SomeView = view(SomeViewModel)(({ viewModel }) => (
            <div>{viewModel.n}</div>
        ));

        const { getByText } = render(<SomeView/>);

        viewModel.n++;
        await waitFor(() => expect(getByText(viewModel.n.toString())).toBeInTheDocument());

        viewModel.n++;
        await waitFor(() => expect(getByText(viewModel.n.toString())).toBeInTheDocument());

        viewModel.n++;
        await waitFor(() => expect(getByText(viewModel.n.toString())).toBeInTheDocument());
    });

    test('Testing error boundary', async () => {
        @injectable()
        class SomeViewModel extends ViewModel {}

        const ErrorView = () => {
            throw new Error();
        };

        const SomeView = view(SomeViewModel)(() => <ErrorView/>);

        const { getByText } = render(
            <div>
                <span>Test text</span>
                <SomeView/>
            </div>
        );

        expect(getByText('Test text')).toBeInTheDocument();
    });

    test('Testing child view', async () => {
        @injectable()
        class SomeViewModel extends ViewModel {
            field = 'Field';
        }

        const SomeView = childView<SomeViewModel>(({ viewModel }) => (
            <span>{viewModel.field}</span>
        ));

        const SomeParentView = view(SomeViewModel)(() => <SomeView/>);

        const { getByText } = render(<SomeParentView/>);

        expect(getByText('Field')).toBeInTheDocument();
    });
});
