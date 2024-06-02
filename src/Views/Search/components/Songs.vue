<script lang="tsx">
import { formatDuration } from '@/utils/index'
import { PropType } from 'vue'
export default defineComponent({
  props: {
    songsList: {
      type: Array as PropType<Array<SongType>>,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const songs = props.songsList.map((item) => {
      const _tempArr = item.name.split(props.keywords)
      const customName = (
        <div class='name'>
          <span>{_tempArr[0]}</span>
          <span style={{ color: '#5E7CBD' }}>{props.keywords}</span>
          <span>{_tempArr[1]}</span>
        </div>
      )
      item.nameElement = customName
      return item
    })
    watch(
      () => props.songsList,
      (newVal) => {
        console.log('监听变化', newVal[0].picUrl)
      }
    )
    const render = () =>
      songs.map((item, index) => (
        <div class='row-flex item-songs' key={index}>
          <div class='rank'>{index + 1}</div>
          <div class='title'>
            <img src={item.artists[0].img1v1Url} alt='' />
            <div class='title-info'>
              {item.nameElement}
              <div class='author'>{item.artists[0].name}</div>
            </div>
          </div>
          <div class='album'>{item.album.name}</div>
          <div class='lover'>
            <i class='iconfont icon-aixin1'></i>
          </div>
          <div class='duration'>{formatDuration(item.duration)}</div>
        </div>
      ))
    return () => render()
  },
})
</script>

<style lang="scss" scoped>
.row-flex {
  width: 100%;
  display: flex;
  align-items: center;
  .rank {
    color: $greyColor;
    width: 40px;
    text-align: center;
  }
  .title {
    flex: 0.5;
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      margin-right: 10px;
    }
    .title-info {
      .name {
        color: #495d8a;
      }
      .author {
        color: $greyColor;
        font-size: 12px;
      }
    }
  }
  .album {
    flex: 0.5;
    // font-size: 12px;
    color: $greyColor;
  }
  .lover {
    width: 60px;
    cursor: pointer;
  }
  .duration {
    width: 80px;
    color: $greyColor;
    font-size: 14px;
  }
}
.item-songs {
  height: 70px;
  .album {
    flex: 0.5;
    font-size: 12px;
    color: $greyColor;
  }
  .duration {
    width: 80px;
    color: $greyColor;
    font-size: 12px;
  }
  // &:hover {
  //   @include card_shadow('card-box-shadow');
  //   @include card_bg_color('card-bg-color');
  //   border-radius: 12px;
  // }
}
</style>
