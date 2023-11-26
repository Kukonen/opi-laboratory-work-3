import './Story.css';

interface StoryProps {
    description: string;
    type: 'plus' | 'minus';
}

export default ({description, type} : StoryProps) => {
    let cn = "block ";
    cn += type === 'plus' ? "home__history__story_plus" :
          type === 'minus' ? "home__history__story_minus" :
          "";

    return (
        <div
            className={cn}
        >
            {description}
        </div>
    )
}
