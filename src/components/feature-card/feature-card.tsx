import { Box, Card } from '@/ui-kit';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <Card hoverable padding='lg'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <div className='mb-4'>{icon}</div>
        <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>{title}</h3>
        <p className='text-gray-600 dark:text-gray-300'>{description}</p>
      </Box>
    </Card>
  );
};

export default FeatureCard;
