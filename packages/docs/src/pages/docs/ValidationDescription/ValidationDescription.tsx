import { Alert, Typography } from '@mui/material';
import { Highlighter, Code, PageBlock, TextLink } from '@components';
import base from './base.example';
import base2 from './base2.example';
import advanced from './advanced.example';
import advanced2 from './advanced2.example';
import conditional from './conditional.example';
import conditional2 from './conditional2.example';

export const ValidationDescription = () => (
  <PageBlock
    title="Validation"
    description={(
      <Typography component="p">
        <i>MobX Form Schema</i> does not provide any validation rules out of the box, but you can your own.
      </Typography>
    )}
  >
    <PageBlock
      title="Usage"
      description={(
        <>
          <Typography component="p">
            You can use <Code>isValid</Code> getter to understand whether all the fields are valid.
          </Typography>

          <Typography component="p">
            You can use <Code>errors</Code> getter to get all the errors of the form.
          </Typography>
        </>
      )}
    >
      <Highlighter code={base} />

      <Typography component="p">
        Each time <Code>password</Code> is changed, <Code>FormSchema</Code> will automatically
        apply the validation.
      </Typography>

      <Typography component="p">
        You can provide several validation rules, in order to separate your validation
        logic and get an ability to use different validation messages for different rules.
      </Typography>

      <Highlighter code={base2} />
    </PageBlock>

    <PageBlock
      title="Advanced validation"
      description={(
        <Typography component="p">
          A <i>validator</i> function can take 2 parameters as an input - the value to validate
          and the entire schema.
        </Typography>
      )}
    >
      <Highlighter code={advanced} />

      <Typography component="p">
        All the validation applies using MobX's <Code>autorun</Code> function, which means
        that in the example of <Code>repeatedPassword</Code> the validation will be applied
        not only when <Code>repeatedPassword</Code>, but also when <Code>password</Code> is
        changed as well.
      </Typography>

      <Typography component="p">
        You can provide several validation rules, in order to separate your validation
        logic and get an ability to use different validation messages for different rules.
      </Typography>

      <Highlighter code={advanced2} />
    </PageBlock>

    <PageBlock
      title="Conditional validation"
      description={(
        <Typography component="p">
          With <i>MobX Form Schema</i> you can also apply rules to turn off the validation
          using <Code>validate(...).if</Code> decorator.
        </Typography>
      )}
    >
      <Highlighter code={conditional} />

      <Typography component="p">
        In the example above the validation for <Code>email</Code> will be applied it's
        not an empty string. This trick is helpful for validating non-required fields.
      </Typography>

      <Typography component="p">
        The condition of <Code>name</Code> property is based on the other property of
        schema. And <Code>name</Code> will be validated only,
        when <Code>wantToFillInTheName</Code> is <Code>true</Code>.
      </Typography>

      <Highlighter code={conditional2} />
    </PageBlock>
  </PageBlock>
);
