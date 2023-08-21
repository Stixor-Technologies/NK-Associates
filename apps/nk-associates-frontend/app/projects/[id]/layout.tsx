export default function Layout(props: {
  children: React.ReactNode;
  threeDModel: React.ReactNode;
}) {
  return (
    <>
      {props.threeDModel}
      {props.children}
    </>
  );
}
