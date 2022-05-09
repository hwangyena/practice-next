import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

export default function TestDetailPage({ id }: { id: string }) {
  // export default function TestDetailPage({ id }: InferGetStaticPropsType<typeof getStatisPaths>) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  return (
    <div>
      <h1>Test Detail</h1>
      {id}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('hey');
  return {
    //the page only can use in /testing/1, /testing/2
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  // const { router, EmployeeInvitation,InvitationError } = useCheckInvitation(context.params);

  //this props can be checked at _app > pageProps
  return {
    props: { noGnb: true },
  };
};
