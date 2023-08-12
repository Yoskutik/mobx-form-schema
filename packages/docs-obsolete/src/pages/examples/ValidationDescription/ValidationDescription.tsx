import { Alert, Typography } from '@mui/material';
import { Highlighter, Code, PageBlock, TextLink } from '@components';
import base from './base.example';
import base2 from './base2.example';
import base3 from './base3.example';
import advanced from './advanced.example';
import advanced2 from './advanced2.example';
import conditional from './conditional.example';
import conditional2 from './conditional2.example';
import manual from './manual.example';

export const ValidationDescription = () => (
  <PageBlock
    title="Validation"
    description={(
      <>
        <Typography component="p">
          To start using validation, you must write the validation rules yourself. A validation rule for a
          schema is simply a function that returns either a string or a boolean value. If the function
          returns false, validation is considered passed. And if a string or true - no. Moreover, the
          string passed in the validator becomes an error message.
        </Typography>

        <Highlighter code={base} />
      </>
    )}
  >
    <PageBlock
      title="Basic usage"
      description={(
        <Typography component="p">
          You can start apply the validation by using <Code>@validate</Code> decorator. You should pass
          validation rules into this function. Each rule will be applied sequentially. If any validation
          rule is not passed, other rules will not be used.
        </Typography>
      )}
    >
      <Highlighter code={base2} />

      <Typography component="p">
        To understand whether your form is valid you can use <Code>isValid</Code> getter. To get error
        messages of your form you can use <Code>errors</Code> getter.
      </Typography>

      <Highlighter code={base3} />
    </PageBlock>

    <PageBlock
      title="Using entire schema"
      description={(
        <Typography component="p">
          Sometimes validation can be complicated, and depends not only on the current value of the
          field, but also on other values in the form. For example, the password confirmation field
          must match the password. Setting up such validation is also easy.
        </Typography>
      )}
    >
      <Typography component="p">
        The validator function accepts two parameters as input: the current value of the form and
        the scheme of the form. And the second parameter can just be used in such cases.
      </Typography>

      <Highlighter code={advanced} />

      <Typography component="p">
        By default, all the validation applies using MobX's <Code>autorun</Code> function, which
        means that in the example of <Code>repeatedPassword</Code> the validation will be applied
        not only when <Code>repeatedPassword</Code>, but also when <Code>password</Code> is
        changed as well.
      </Typography>

      <Highlighter code={advanced2} />
    </PageBlock>

    <PageBlock
      title="Conditional validation"
      description={(
        <Typography component="p">
          There may be situations when there is a need to disable validation. Fields may be
          optional or may be hidden for some reason, and in some cases validation of some
          fields should be disabled depending on the values of other fields.
        </Typography>
      )}
    >
      <Typography component="p">
        All this can be achieved as easily as possible. You just need to use the
        decorator <Code>@validate(...).if(...)</Code>, and pass a predictor function to it,
        by which the scheme will determine at what point to enable or disable validation.
      </Typography>

      <Highlighter code={conditional} />

      <Typography component="p">
        In the example above the validation for <Code>email</Code> will be applied it's
        not an empty string. This trick is helpful for validating non-required fields.
      </Typography>

      <Typography component="p">
        The condition of <Code>name</Code> property is based on the other property of
        schema. And <Code>name</Code> will be validated only,
        when <Code>wantToShareName</Code> is <Code>true</Code>.
      </Typography>

      <Highlighter code={conditional2} />
    </PageBlock>

    <PageBlock
      title="Manual validation"
      description={(
        <Typography component="p">
          As you may noticed, by default, all the validation is applied automatically.
          Each time the field or any data, which validation depends on, is updated
          the validation will be recalculated. You might want to turn off such behaviour.
          To do that, you must set <Code>config</Code> static object in your schema.
        </Typography>
      )}
    >
      <Highlighter code={manual} />
    </PageBlock>
  </PageBlock>
);
