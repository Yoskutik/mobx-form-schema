import { FC, ReactNode, useState, MouseEvent } from 'react';
import { Box, styled } from '@mui/material';
import { Highlighter, VFlexBox } from '@components';

const FileTab = styled('div')`
  padding: 4px 8px;
  border-bottom: 1px solid transparent;
  margin-bottom: -1px;
  margin-right: 4px;
  cursor: pointer;
  color: #fff;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
`;

const FileTabContainer = styled(Box)`
  display: flex;
  padding: 16px 16px 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

const Block = styled(Box)`
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px 0;
  border-radius: 8px;
  margin-top: 32px;
  overflow: hidden;
  display: flex;
  
  .right-side {
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 0 8px 8px 0;
    flex-shrink: 0;
    background: #fff;
    width: 300px;
    padding: 12px;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;

    .right-side {
      border-radius: 0 0 8px 8px;
      display: flex;
      width: 100%;

      form {
        width: min(50%, 300px);
        margin-right: 20px;
      }

      & > * {
        overflow: hidden;
      }
    }
  }

  @media screen and (max-width: 464px) {
    flex-direction: column;

    .right-side {
      flex-direction: column;

      form {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;

type TFile = {
  code: string;
  filename: string;
};

type Props = {
  items: TFile[];
  children: ReactNode;
};

export const EntireExample: FC<Props> = ({ items, children }) => {
  const [chosenItem, setChosenItem] = useState(items[0]);

  const createFileTabHandler = (it: TFile) => (evt: MouseEvent) => {
    setChosenItem(it);

    const target = evt.target as HTMLDivElement;
    const parent = target.parentElement as HTMLDivElement;

    parent.scroll({
      left: target.offsetLeft - parent.offsetLeft - 50,
      behavior: 'smooth'
    });
  };

  return (
    <Block>
      <VFlexBox sx={{ background: 'rgb(40, 42, 54)', overflow: 'hidden', flex: 1 }}>
        <FileTabContainer>
          {items.map(it => (
            <FileTab
              className={it === chosenItem ? 'active' : undefined}
              onClick={createFileTabHandler(it)}
              key={it.filename}
            >
              {it.filename}
            </FileTab>
          ))}
        </FileTabContainer>
        <Highlighter code={chosenItem.code} style={{ height: 400, minHeight: '100%' }} sx={{ flex: 1 }} />
      </VFlexBox>

      <div className="right-side">
        {children}
      </div>
    </Block>
  );
};