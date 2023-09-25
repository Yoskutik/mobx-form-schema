import { Text, Section, EntireExample, Code } from '@components';

const Installation = () => (
  <>
    <Section title="MobX Form Schema Installation">
      <Text>
        Since the only one dependency the MobX Form Schema is <Code>mobx</Code>, in order to use it, you
        have to install the MobX Form Schema and MobX. But be aware, that you need to have MobX of the
        6<sup>th</sup> version. And once again, there&apos;s no need to install <Code>react</Code>.
      </Text>

      <EntireExample
        items={[
          { filename: 'NPM', code: 'npm install -D @yoskutik/mobx-form-schema mobx' },
          { filename: 'Yarn', code: 'yarn add -D @yoskutik/mobx-form-schema mobx' },
          { filename: 'PNPM', code: 'pnpm add -D @yoskutik/mobx-form-schema mobx' },
        ]}
        language="bash"
      />

      <Section title="Installation with legacy decorators">
        <Text>
          Right now, by default, TypeScript compiles decorators into their new implementation. And Babel
          recommends you use a new one as well. But in case you have to use the legacy implementation of
          decorators, you may also need <Code>reflect-metadata</Code> package.
        </Text>

        <EntireExample
          items={[
            { filename: 'NPM', code: 'npm install -D @yoskutik/mobx-form-schema mobx reflect-metadata' },
            { filename: 'Yarn', code: 'yarn add -D @yoskutik/mobx-form-schema mobx reflect-metadata' },
            { filename: 'PNPM', code: 'pnpm add -D @yoskutik/mobx-form-schema mobx reflect-metadata' },
          ]}
          language="bash"
        />
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        You&apos;ll see how to configure your setup in order to use MobX Form Schema and decorators.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default Installation;
