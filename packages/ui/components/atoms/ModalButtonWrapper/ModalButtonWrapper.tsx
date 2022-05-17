export const ModalButtonWrapper = ({
  children,
  className = "",
}: {
  children: any;
  className?: string;
}) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full bg-base-200 shadow-200 border-t py-2 px-3 ${className}`}
    >
      {children}
    </div>
  );
};
