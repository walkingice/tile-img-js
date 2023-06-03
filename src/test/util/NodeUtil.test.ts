import * as NodeUrl from 'node:url';
import { NodeUtil } from '../../main/util/NodeUtil';

test('Verify NodeUtil.appendFileName', () => {
    const dirUrl: NodeUrl.URL = NodeUrl.pathToFileURL("/path/to/some/dir")
    const fileNameUrl: NodeUrl.URL = NodeUtil.appendFileName(dirUrl, "output.png")
    const fileNamePath: string = NodeUrl.fileURLToPath(fileNameUrl)
    expect(fileNamePath).toEqual("/path/to/some/dir/output.png")
});

