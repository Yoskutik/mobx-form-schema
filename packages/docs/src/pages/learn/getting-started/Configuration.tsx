import { Text, Section, EntireExample, Code } from '@components';

const Configuration = () => (
  <>
    <Section title="MobX Form Schema Configuration">
      <Text>
        MobX Form Schema&apos;s decorators work both under modern and legacy (experimental) decorators
        implementations. In this article, you&apos;ll find a short instruction on how to configure your
        compilers and the library in order to enable decorators.
      </Text>

      <Section title="Using modern decorators">
        <Text>
          By default, MobX Form Schema provides you typings of modern implementation of decorators. Thus,
          there&apos;s no need to configure the library if you want to use the modern standard, but we can
          shortly remind you how to configure your compilers to start using modern implementation of decorators.
        </Text>

        <EntireExample
          language="json"
          items={[
            {
              filename: 'tsconfig.json',
              code: '{\n'
                + '  "compilerOptions": {\n'
                + '    "experimentalDecorators": false,\n'
                + '    "emitDecoratorMetadata": false\n'
                + '  }\n'
                + '}\n',
            },
            {
              filename: 'babel.config.json',
              code: '{\n'
                + '  "plugins": [\n'
                + '    ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]\n'
                + '  ]\n'
                + '}',
            },
          ]}
        />
      </Section>

      <Section title="Using legacy decorators">
        <Text>
          Legacy decorators can still be useful. For example, decorators in the 6<sup>th</sup> version of
          MobX works only in the legacy implementation. So, if you want to use decorators from MobX or
          you have any other reasons to use them, you can configure your set up for it.
        </Text>

        <Text>
          First of all, you have to ensure, you configured your compiler right.
        </Text>

        <EntireExample
          language="json"
          items={[
            {
              filename: 'tsconfig.json',
              code: '{\n'
                + '  "compilerOptions": {\n'
                + '    "experimentalDecorators": true,\n'
                + '    "emitDecoratorMetadata": true\n'
                + '  }\n'
                + '}\n',
            },
            {
              filename: 'babel.config.json',
              code: '{\n'
                + '  "plugins": [\n'
                + '    ["@babel/plugin-proposal-decorators", { "version": "legacy" }]\n'
                + '  ]\n'
                + '}',
            },
          ]}
        />

        <Text>
          As it was mentioned earlier, by default, MobX Form Schema expect you to use typings from the
          modern standard. But you can switch to use the legacy one.
        </Text>

        <Text>
          Also, you have to import <Code>reflect-metadata</Code> package in order to start using
          legacy decorators.
        </Text>

        <EntireExample
          items={[
            {
              filename: 'index.tsx',
              code: '// Needed for switching typings to legacy implementation\n'
                + 'import \'@yoskutik/mobx-form-schema/dist/enable-legacy-experimental-decorators-types\';\n'
                + '// Needed for using legacy decorators\n'
                + 'import \'reflect-metadata\';\n',
            },
          ]}
        />
      </Section>
    </Section>

    <Section title="Next">
      <Text>
        You&apos;ll see how you can describe your form validation.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default Configuration;
