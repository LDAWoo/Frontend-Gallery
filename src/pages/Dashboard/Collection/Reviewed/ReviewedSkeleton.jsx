import Skeleton from "~/components/Skeleton";

const ReviewedSkeleton = () => {
  return (
    <Skeleton viewBox="0 0 500 740">
      <rect x="0" y="0%" rx="5" ry="5" width="100%" height="70%" />
      <rect x="8%" y="75%" rx="5" ry="5" width="85%" height="8%" />
      <rect x="8%" y="86%" rx="5" ry="5" width="50%" height="8%" />
    </Skeleton>
  );
};

export default ReviewedSkeleton;
