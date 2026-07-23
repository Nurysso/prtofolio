export { hecateMetadata as metadata } from '@/lib/project-metadata';

import HecateClient from './HecateClient';

export default function HecatePage() {
  return <HecateClient />;
}
