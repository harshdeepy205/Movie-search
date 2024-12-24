/**
 * @function LazyLoading
 * @param { HTMLElement } target : the target element to trigger the endless scroll callback.
 * @param { boolean } loading : boolean value indicates if the previous intersection data is still loading to block any further intersection callback.
 * @param { function } callback : callback function to trigger when target element intersects at the given threshold.
 * @param { Object } options : options object to be passed in IntersectionObserver. Defines intersection condition.
 * @param { boolean } observe : boolean value to start observing the target.
 * @param { boolean } unobserve : boolean value to stop observing the target.
 * @param { component } children : children passed to this component.
 * @returns : the children with lazy loading functionality.
 */
const LazyLoading = props => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !props.loading) {
                observer.unobserve(entry.target);
                props.callback({
                    entries,
                    entry
                });
            };
        });

    }, props.options);

    props.observe && observer.observe(props.target)
    props.unobserve && observer.unobserve(props.target)

    return props.children
};

export default LazyLoading;
