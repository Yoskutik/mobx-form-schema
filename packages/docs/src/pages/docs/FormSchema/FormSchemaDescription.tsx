import { Typography } from '@mui/material';
import { Code, Highlighter, PageBlock, TextLink } from '@components';
import { Grid, GridDivider, GridItem, GridTitle } from '../Grid';
import config from './config.example';

type YouCanSeeDescriptionProps = {
  docs: string;
  examples: string;
};

const YouCanSeeDescription = ({ docs, examples }: YouCanSeeDescriptionProps) => (
  <Typography component="p">
    For better understanding see:
    <TextLink text={`@${docs} docs`} id={`decorators.${docs}`} page="docs" /> /
    <TextLink text={`${examples} examples`} id={examples} page="examples" />.
  </Typography>
);

export const FormSchemaDescription = () => {
  const validateLinks = (
    <YouCanSeeDescription examples="validation" docs="validate" />
  );

  const watchLinks = (
    <YouCanSeeDescription examples="observation" docs="watch" />
  );

  return (
    <PageBlock
      title="ManualFormSchema"
      description={(
        <Typography component="p">
          <Code>ManualFormSchema</Code> is base class. In order to create your schema
          you have to create a new class extended from this base class.
        </Typography>
      )}
    >
      <Grid>
        <GridTitle text="Static properties" />

        <GridDivider />

        <GridItem item="procted static config">
          <Typography component="p">
            An object, that provides schema's configuration. This objects contains
            one field - <Code>manual</Code>. By default, the <Code>manual</Code> is
            equal to <Code>false</Code>. Which means that all the validation and
            observation will be called using <Code>autorun</Code> function. If you
            want to turn of such behaviour, switch this value to <Code>true</Code>.
          </Typography>
          <Highlighter code={config} />
        </GridItem>

        <GridTitle text="Static methods" />

        <GridDivider />

        <GridItem item="static create([initialData])">
          <Typography component="p">
            An method that creates an instance of <Code>ManualFormSchema</Code>. In order
            to create one, you must use it.
          </Typography>

          <Typography component="p">
            <Code>create</Code> method makes your schema observable, so you don't
            have to call <Code>makeObservable</Code> function inside your schema's
            constructor. In case you want to create reactions in your schema, you
            should call it in the constructor, but usually you don't have to think
            about using it.
          </Typography>

          <Typography component="p">
            You can pass data into this function, which will be used to create the
            initial state of your form. If such object is not passed, the initial
            state will be created using initial values from schema's class. See
            <TextLink text="@factory" id="" /> for better understanding.
          </Typography>
        </GridItem>

        <GridTitle text="Getters" />

        <GridDivider />

        <GridItem item="get errors">
          <Typography component="p">
            An object that contains validation error messages of your form.
          </Typography>

          {validateLinks}
        </GridItem>

        <GridItem item="get isValid">
          <Typography component="p">
            A boolean that tells whether your form is valid.
          </Typography>

          {validateLinks}
        </GridItem>

        <GridItem item="get isChanged">
          <Typography component="p">
            An boolean that tells whether your form is changed.
          </Typography>

          {watchLinks}
        </GridItem>

        <GridItem item="get presentation">
          <Typography component="p">
            An object that contains presentation of your form's data.
          </Typography>

          <YouCanSeeDescription examples="presentation" docs="presentation" />
        </GridItem>

        <GridTitle text="Methods" />

        <GridDivider />

        <GridItem item="validate([field])">
          <Typography component="p">
            You can validate a single property in your schema or validate its entirely.
            If you pass a field name to this function, only this property will be
            validated. If you don't, the form will be validated entirely.
          </Typography>

          <Typography component="p">
            There's no need to call this function, if you don't
            set <Code>config.manual</Code> to <Code>true</Code>, because the validation
            will be applied automatically.
          </Typography>

          <Typography component="p">
            After this function is called, the <Code>errors</Code> object is updated.
          </Typography>

          <Typography component="p">
            The function return the result of validation. If a name of property if passed
            the function return the result of its validators. If not, return boolean that
            tells whether the form is valid.
          </Typography>

          {validateLinks}
        </GridItem>

        <GridItem item="checkChanges([field])">
          <Typography component="p">
            You can check if a single property is differs from the initial state or if
            there's any changes in the entire schema. If you pass a field name to this
            function, only this property will be checked. If you don't, the form will
            be checked entirely.
          </Typography>

          <Typography component="p">
            There's no need to call this function, if you don't
            set <Code>config.manual</Code> to <Code>true</Code>, because the observation
            will be applied automatically.
          </Typography>

          <Typography component="p">
            After this function is called, the <Code>isChanged</Code> getter is updated.
          </Typography>

          <Typography component="p">
            If property name is passed, will return is property changed. If not, will
            return is entire form is changed.
          </Typography>

          {validateLinks}
        </GridItem>

        <GridItem item="getInitial(field)">
          <Typography component="p">
            A function, that returns the initial value of a single property in a schema.
          </Typography>

          {watchLinks}
        </GridItem>

        <GridItem item="sync()">
          <Typography component="p">
            A function, that saves the current state of your schema as the initial. And
            because the current state starts being initial, the <Code>isChanged</Code> getter
            starts to return <Code>false</Code>.
          </Typography>

          {watchLinks}
        </GridItem>

        <GridItem item="reset()">
          <Typography component="p">
            A function, that reset state from the current to the initial. And because
            the current state resets into initial, the <Code>isChanged</Code> getter
            starts to return <Code>false</Code>.
          </Typography>

          {watchLinks}
        </GridItem>
      </Grid>
    </PageBlock>
  );
};
