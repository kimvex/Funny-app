import {
  StyleSheet
} from 'react-native';
import { webWeights, sanFranciscoWeights, iOSColors } from 'react-native-typography'

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: iOSColors.customGray,
  },
  ContainerInformation: {
    flex: 9,
    position: 'relative'
  },
  NavBar: {
    flex: 1,
    backgroundColor: '#fcfeff',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 0 },
  },
  ItemOfNavBar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  BarSelected: {
    borderTopWidth: 3,
    borderTopColor: '#493FE9'
  },
  TextItemsNavBar: {
    fontWeight: 'bold',
    color: '#493FE9'
  },
  // Diseño para la lista,
  ComponentToucheables: {
    height: 180,
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 7, width: 0 },
  },
  emptyContainer: {
    width: '100%',
    flex: 1,
    paddingTop: '75%',
    padding: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textEmpty: {
    fontSize: 20,
    fontWeight: '700',
  },
  viewContainerCard: {
    paddingLeft: '5%',
    paddingRight: '5%',
    flex: 1,
    justifyContent: 'space-around'
  },
  viewContainerP: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  viewContainerImage: {
    width: '25%',
    height: '100%',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center'
  },
  viewImage: {
    width: '90%',
    height: '70%',
    paddingTop: '10%',
    borderRadius: 3,
    overflow: 'hidden'
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 3
  },
  viewContainerText: {
    width: '75%'
  },
  textTitleCard: {
    fontSize: 19,
    color: iOSColors.black,
    textAlign: 'left'
  },
  textInformation: {
    paddingTop: 5,
    fontSize: 16,
    color: iOSColors.gray,
    textAlign: 'left',
    lineHeight: 14,
  },
  footerOfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: '3%',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
  },
  itemsOfBottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeOfPublication: {
    fontSize: 16,
    color: iOSColors.gray
  },
  // Content publication
  ContentPublication: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
  },
  positionClosePublication: {
    paddingRight: '5%',
    alignItems: 'flex-end',
    flex: 0
  },
  ContainerPublicationViewCard: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '5%'
  },
  titleCardPublication: {
    textAlign: 'center',
    fontSize: 25,
  },
  contentInformationPublication: {
    textAlign: 'justify',
    fontSize: 18,
    paddingTop: '7%',
    paddingLeft: '7%',
    paddingRight: '7%',
  },
  optionsOfPublication: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  toucheable: {
    width: '25%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '3%'
  },
  TextOptions: {
    fontSize: 25,
    color: '#493FE9'
  },
  InfiniteScrollComments: {
    flex: 3
  },
  separationsOptions: {
    textAlign: 'center',
    paddingBottom: '3%'
  },
  contentComment: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1.5,
  },
  profileData: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  styleOfModal: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 110,
    marginRight: 5,
  },
  textInputForComment: {
    width: '82%',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 12,
    height: 45,
    paddingTop: 15,
    paddingLeft: 15,
    borderBottomColor: '#493FE9',
    borderBottomWidth: 1,
    borderLeftColor: '#493FE9',
    borderLeftWidth: 1,
    borderRightColor: '#493FE9',
    borderRightWidth: 1,
    borderTopColor: '#493FE9',
    borderTopWidth: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
