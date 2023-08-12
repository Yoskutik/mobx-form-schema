// import { Box, Card, styled, Typography } from '@mui/material';
// import { FC, ReactNode } from 'react';
// import { HFlexBox, Highlighter, VFlexBox } from '@components';
//
// export const Block = styled(Box)`
//   background-color: rgba(0, 0, 0, 0.03);
//   justify-content: center;
//   padding: 32px 0;
//   display: flex;
// `;
//
// type HomeBlockProps = {
//   title: string;
//   titleActions?: ReactNode;
//   children: ReactNode;
// };
//
// export const HomeBlock: FC<HomeBlockProps> = ({ title, titleActions, children }) => (
//   <VFlexBox sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', p: '32px 0' }}>
//     <Card sx={{
//       maxWidth: 'min(1100px, 95vw)',
//       flexDirection: 'column',
//       display: 'flex',
//       m: '0 auto',
//       p: { xs: 2, sm: 4, md: 6 },
//     }}>
//       <HFlexBox flexWrap="wrap">
//         <Typography variant="h2" sx={{ mr: 3 }}>
//           {title}
//         </Typography>
//
//         {titleActions}
//       </HFlexBox>
//
//       {children}
//     </Card>
//   </VFlexBox>
// );
//
// export const CodeExample: FC<{ title: string, code: string }> = ({ title, code }) => (
//   <Block>
//     <Box sx={{ width: '1000px', padding: 4, maxWidth: '100%' }}>
//       <Typography component="h5" variant="h5">
//         {title}
//       </Typography>
//       <Highlighter code={code} sx={{ mt: 3 }} />
//     </Box>
//   </Block>
// );
