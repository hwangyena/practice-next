import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function TestingPage({ test }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Test~!!</h1>
      {test}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('param', params);
  // const { router, EmployeeInvitation,InvitationError } = useCheckInvitation(context.params);

  return {
    props: {
      test: 'hey',
    },
  };
};
