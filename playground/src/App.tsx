import { Tooltip } from '@/components';

function App() {
  return (
    <div className='min-h-screen flex place-items-center place-content-center pt-12 gap-6 bg-gray-200'>
      <Tooltip content='Awesome!'>
        <div>Bottom</div>
      </Tooltip>
      <Tooltip content='Awesome!' position='left'>
        <div>Left</div>
      </Tooltip>

      <Tooltip content='Awesome!' position='top'>
        <div>Top</div>
      </Tooltip>
      <Tooltip content='Awesome!' position='right'>
        <div>Right</div>
      </Tooltip>
    </div>
  );
}

export default App;
