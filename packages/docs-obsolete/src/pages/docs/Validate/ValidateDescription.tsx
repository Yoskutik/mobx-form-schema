import { Typography } from '@mui/material';
import { Code, Highlighter, PageBlock, TextLink } from '@components';
import validationRules from '../../examples/ValidationDescription/base.example';
import conditional from '../../examples/ValidationDescription/conditional.example';
import validate from './validate.example';

const Link = ({ id }: { id: string }) => (
  <Typography component="p">
    For better understanding see:
    <TextLink text="example" id={`validation.${id}`} />.
  </Typography>
);

export const ValidateDescription = () => (
  <PageBlock
    title="Validate"
    description={(
      <>
        <Typography component="p">
          Applying <Code>@validate</Code> decorator enables its validation. You have to pass your
          validation rules into this function. Each rule will be applied sequentially.
        </Typography>

        <Typography component="p">
          If validation fails, the validation error message appears in the <Code>errors</Code> object.
          If validation passes, the error message of a property deletes from <Code>errors</Code> object.
        </Typography>

        <Typography component="p">
          If there's any validation errors, the <Code>isValid</Code> getter will return false.
        </Typography>
      </>
    )}
  >
    <PageBlock
      title="Validation rules"
      description={(
        <Typography component="p">
          The validation function is a function that receives 2 parameters - the current value of the
          property and the entire schema, and return a boolean or string value. If function returns
          {' '} <Code>false</Code> the validation is considered to passed. If function returns
          string, this string will be used as validation error message.
        </Typography>
      )}
    >
      <Highlighter code={validationRules} />
    </PageBlock>

    <PageBlock
      title={<Code>@validate()</Code>}
      description={(
        <Typography component="p">
          Each validation rule is applied sequentially. If first rule is passed, then second is applied,
          and so on. And if all the rules are passed, the field is considered to be valid.
        </Typography>
      )}
    >
      <Highlighter code={validate} />

      <Link id="basic-usage" />
    </PageBlock>

    <PageBlock
      title={<Code>@validate().if()</Code>}
      description={(
        <Typography component="p">
          You can make your validation conditional. To do that you must call <Code>@validate().if()</Code>
          {' '} decorator.
        </Typography>
      )}
    >
      <Highlighter code={conditional} />

      <Link id="conditional-validation" />
    </PageBlock>
  </PageBlock>
);