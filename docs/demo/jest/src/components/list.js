/**
 * @file jest demo file
 **/
import san from 'san';

export default san.defineComponent({
    template: `<ul>
        <li s-for="item in items">
            {{item}}
        </li>
    </ul>`
});
